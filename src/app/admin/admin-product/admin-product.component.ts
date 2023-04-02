import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICategoryResponse, IProductResponse } from 'src/app/shared/interfaces/interfaces';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ImageService } from 'src/app/shared/services/imageload/image.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent implements OnInit{

  public adminCategories: ICategoryResponse[] = [];
  public adminProducts: IProductResponse[] = [];
  public productForm!: FormGroup;
  public productsToggle = false;
  public editStatus = false;
  public currCategoryID = 0;
  public currProductID = 0;
  public uploadPercent = 0;
  public isUploaded = false;
  public isOpen = false;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private fb: FormBuilder,
    private imageService: ImageService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
    this.initProductForm();
  }

  initProductForm(): void {
    this.productForm = this.fb.group({
      category: [null, Validators.required],
      name: [null, Validators.required],
      ingredients: [null, Validators.required],
      path: [null, Validators.required],
      weight: [null, Validators.required],
      price: [null, Validators.required],
      imagePath: [null, Validators.required],
      count: [1]
    });
  }

  loadCategories(): void {
    this.categoryService.getAll().subscribe(data => {
      this.adminCategories = data;
      this.productForm.patchValue({
        category: this.adminCategories[0].id
      })
    })
  }

  loadProducts(): void {
    this.productService.getAll().subscribe(data => {
      this.adminProducts = data;
    })
  }

  toggleForm(): void {
    this.productsToggle = !this.productsToggle
  }

  saveProduct(): void {
    if(this.editStatus) {
      this.productService.update(this.productForm.value, this.currProductID).subscribe(() => {
        this.loadProducts();
        this.toastr.success('Product successfully updated');
      })
    } else {
      this.productService.create(this.productForm.value).subscribe(() => {
        this.loadProducts();
        this.toastr.success('Product successfully created');
      })
    }
    this.editStatus = false;
    this.productForm.reset();
    this.isUploaded = false;
    this.toggleForm();
    this.uploadPercent = 0;
  }

  editProduct(product: IProductResponse): void {
    this.productForm.patchValue({
      category: product.category,
      name: product.name,
      ingredients: product.ingredients,
      path: product.path,
      weight: product.weight,
      price: product.price,
      imagePath: product.imagePath
    })
    this.editStatus = true;
    this.currProductID = product.id;
    this.isUploaded = true;
    this.toggleForm()
  }

  deleteProduct(product: IProductResponse): void {
    this.productService.delete(product.id).subscribe(() => {
      this.loadProducts();
      this.toastr.success('Product successfully deleted');
    })
  }

  upload(event: any): void {
    const file = event.target.files[0];
    this.imageService.uploadFile('images', file.name, file)
      .then(data => {
        this.productForm.patchValue({
          imagePath: data
        });
        this.isUploaded = true;
      })
        .catch(err => {
          console.error(err);
        })  
  }

  deleteImage(): void {
    this.imageService.deleteUploadFile(this.valueByControl('imagePath'))
      .then(() => {
        this.isUploaded = false;
        this.uploadPercent = 0;
        this.productForm.patchValue({ imagePath: null });
      })
      .catch(err => { console.log(err) });
  }

  valueByControl(control: string): string {
    return this.productForm.get(control)?.value;
  }



}

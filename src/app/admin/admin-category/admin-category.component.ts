import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ICategoryResponse } from 'src/app/shared/interfaces/interfaces';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ImageService } from 'src/app/shared/services/imageload/image.service';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit{
  public adminCategories: ICategoryResponse[] = [];
  public categoryForm!: FormGroup;
  public editStatus = false;
  public currCategoryID!: string;
  public uploadPercent!: number;
  public isUploaded = false;
  public categoryToggle = false;

  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private imageService: ImageService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadCategories();
    this.initCategoryForm();
  }

  initCategoryForm(): void {
    this.categoryForm = this.fb.group({
      name: [null, Validators.required],
      path: [null, Validators.required],
      imagePath: [null, Validators.required]
    });
  }

  loadCategories(): void {
    this.categoryService.getAllFirebase().subscribe(data => {
      this.adminCategories = data as ICategoryResponse[];
    })
  }

  toggleCategory(): void {
    this.categoryToggle = !this.categoryToggle;
  }

  saveCategory(): void {
    if(this.editStatus) {
      this.categoryService.updateFirebase(this.categoryForm.value, this.currCategoryID as string).then(() => {
        this.loadCategories();
        this.toastr.success('Category successfully updated');
      })
    } else {
      this.categoryService.createFirebase(this.categoryForm.value).then(() => {
        this.loadCategories();
        this.toastr.success('Category successfully created');
      })
    }
    this.editStatus = false;
    this.categoryForm.reset();
    this.isUploaded = false;
    this.uploadPercent = 0;
    this.toggleCategory();
  }

  editCategory(category: ICategoryResponse): void {
    this.categoryForm.patchValue({
      name: category.name,
      path: category.path,
      imagePath: category.imagePath
    })
    this.editStatus = true;
    this.currCategoryID = category.id.toString();
    this.isUploaded = true;
    this.toggleCategory();
  }

    // this.categoryService.getOneFirebase(category.id as string).subscribe(data => {
    // console.log(data, 'firebase data')
    // })

  deleteCategory(category: ICategoryResponse): void {
    // this.categoryService.delete(category.id as number).subscribe(() => {
    //   this.loadCategories();
    //   this.toastr.success('Category successfully deleted');
    // })

    this.categoryService.deleteFirebase(category.id as string).then(() => {
      this.loadCategories();
      this.toastr.success('Category successfully deleted');
    })
  }

  upload(event: any): void {
    const file = event.target.files[0];
    this.imageService.uploadFile('images', file.name, file)
      .then(data => {
        this.categoryForm.patchValue({
          imagePath: data
        });
        this.isUploaded = true;
      })
        .catch(err => {
          console.error(err);
        })
  }

  deleteImage(): void {
    this.imageService.deleteUploadFile(this.valueByControl('imagePath')).then(() => {
      console.log('File deleted');
      this.isUploaded = false;
      this.uploadPercent = 0;
      this.categoryForm.patchValue({
        imagePath: null
      });
    })
    .catch(err => { console.log(err) });

  }

  valueByControl(control: string): string {
    return this.categoryForm.get(control)?.value;
  }
}

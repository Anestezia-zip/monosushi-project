import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICategoryResponse } from 'src/app/shared/interfaces/interfaces';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { deleteObject, getDownloadURL, percentage, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent {
  public adminCategories: ICategoryResponse[] = [];
  public categoryForm!: FormGroup;
  public categoriesToggle = false;
  public editStatus = false;
  public editID = 0;
  public uploadPercent!: number;
  public isUploaded = false;

  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private storage: Storage
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
    this.categoryService.getAll().subscribe(data => {
      this.adminCategories = data;
    })
  }

  toggleCategory(): void {
    this.categoriesToggle = !this.categoriesToggle
  }

  saveCategory(): void {
    if(this.editStatus) {
      this.categoryService.update(this.categoryForm.value, this.editID).subscribe(() => {
        this.loadCategories();
      })
    } else {
      this.categoryService.create(this.categoryForm.value).subscribe(() => {
        this.loadCategories();
      })
    }
    this.editStatus = false;
    this.categoryForm.reset();
    this.toggleCategory();
    this.isUploaded = false;
    this.uploadPercent = 0;
  }

  editCategory(category: ICategoryResponse): void {
    this.categoryForm.patchValue({
      name: category.name,
      path: category.path,
      imagePath: category.imagePath
    })
    this.editStatus = true;
    this.editID = category.id;
    this.toggleCategory();
    this.isUploaded = true;
  }

  deleteCategory(category: ICategoryResponse): void {
    this.categoryService.delete(category.id).subscribe(() => {
      this.loadCategories();
    })
  }

  upload(event: any): void {
    const file = event.target.files[0];
    this.uploadFile('images', file.name, file)
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

  async uploadFile(folder: string, name: string, file: File | null): Promise<string> {
    const path = `${folder}/${name}`;
    let url = '';
    if(file) {
      try {
        const storageRef = ref(this.storage, path);
        const task = uploadBytesResumable(storageRef, file);
        percentage(task).subscribe(data => {
          this.uploadPercent = data.progress
        });
        await task;
        url = await getDownloadURL(storageRef);
      } catch (err: any) {
        console.error(err);
      }
    } else console.log('wrong format');
    return Promise.resolve(url)
  }

  deleteImage(): void {
    const task = ref(this.storage, this.valueByControl('imagePath'));
    deleteObject(task).then(() => {
      console.log('File deleted');
      this.isUploaded = false;
      this.uploadPercent = 0;
      this.categoryForm.patchValue({
        imagePath: null
      });
    })
  }

  valueByControl(control: string): string {
    return this.categoryForm.get(control)?.value;
  }
}

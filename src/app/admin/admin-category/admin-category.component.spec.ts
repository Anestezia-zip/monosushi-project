import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminCategoryComponent } from './admin-category.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ReactiveFormsModule} from "@angular/forms";
import {Storage} from "@angular/fire/storage";
import {ToastrModule, ToastrService} from "ngx-toastr";
import {ICategoryResponse} from "../../shared/interfaces/interfaces";
import {of} from "rxjs";
import {CategoryService} from "../../shared/services/category/category.service";

describe('AdminCategoryComponent', () => {
  let component: AdminCategoryComponent;
  let fixture: ComponentFixture<AdminCategoryComponent>;
  let categoryService: CategoryService;
  let toastr: ToastrService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCategoryComponent ],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        ToastrModule.forRoot()
      ],
      providers: [
        CategoryService,
        { provide: Storage, useValue: {} },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCategoryComponent);
    component = fixture.componentInstance;
    categoryService = TestBed.inject(CategoryService);
    toastr = TestBed.inject(ToastrService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load admin-categories', () => {
    spyOn(categoryService, 'getAll').and.returnValue(of(fakeCategories));
    component.loadCategories();
    expect(categoryService.getAll).toHaveBeenCalled();
    expect(component.adminCategories).toEqual(fakeCategories);
  });

  it('should create a new admin-category', () => {
    const categoryForm = {
      value: {
        name: 'New Category',
        path: 'new-category',
        imagePath: 'new-image-path'
      }
    };
    const categoryServiceSpy = spyOn(categoryService, 'create').and.returnValue(of(fakeCategory));
    const toastrSpy = spyOn(toastr, 'success');

    component.categoryForm.setValue(categoryForm.value);
    component.editStatus = false;
    component.saveCategory();

    expect(categoryServiceSpy).toHaveBeenCalledWith(categoryForm.value);
    expect(toastrSpy).toHaveBeenCalledWith('Category successfully created');
  });

  it('should update a new admin-category', () => {
    const categoryForm = {
      value: {
        name: 'Updated Category',
        path: 'updated-category',
        imagePath: 'updated-image-path'
      }
    };
    component.categoryForm.setValue(categoryForm.value);
    component.editStatus = true;
    const categoryServiceSpy = spyOn(categoryService, 'update').and.returnValue(of(fakeCategory));
    const toastrSpy = spyOn(toastr, 'success');
    component.saveCategory();
    expect(categoryServiceSpy).toHaveBeenCalledWith(categoryForm.value, component.currCategoryID);
    expect(toastrSpy).toHaveBeenCalledWith('Category successfully updated');
    expect(component.editStatus).toBeFalse();
    expect(component.isUploaded).toBeFalse();
    expect(component.uploadPercent).toBe(0);
  });

  it('should delete a admin-category', () => {
    const categoryServiceSpy = spyOn(categoryService, 'delete').and.returnValue(of(undefined));
    const toastrSpy = spyOn(toastr, 'success');

    component.deleteCategory(fakeCategory);

    expect(categoryServiceSpy).toHaveBeenCalledWith(fakeCategory.id);
    expect(toastrSpy).toHaveBeenCalledWith('Category successfully deleted');
  });



});

const fakeCategories: ICategoryResponse[] = [
  {
    id: 1,
    name: 'Category 1',
    path: 'string',
    imagePath: 'string'
  }
];

const fakeCategory: ICategoryResponse =
  {
    id: 1,
    name: 'Category 1',
    path: 'string',
    imagePath: 'string'
  }

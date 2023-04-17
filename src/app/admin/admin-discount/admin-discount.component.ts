import { Component, OnInit } from '@angular/core';
import { deleteObject, getDownloadURL, percentage, ref, uploadBytesResumable, Storage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDiscountResponse } from 'src/app/shared/interfaces/interfaces';
import { DiscountService } from 'src/app/shared/services/discount/discount.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-discount',
  templateUrl: './admin-discount.component.html',
  styleUrls: ['./admin-discount.component.scss']
})
export class AdminDiscountComponent implements OnInit {

  public adminDiscounts: IDiscountResponse[] = [];
  public discountForm!: FormGroup;
  public currentDate = new Date().toLocaleString('ru-RU', {month: 'numeric', year: 'numeric'});
  public discountsToggle = false;
  public editStatus = false;
  public editID!: string;
  public uploadPercent!: number;
  public isUploaded = false;

  constructor(
    private discountService: DiscountService,
    private fb: FormBuilder,
    private storage: Storage,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadDiscounts();
    this.initDiscountForm();
  }

  initDiscountForm(): void {
    this.discountForm = this.fb.group({
      date: [this.currentDate],
      name: [null, Validators.required],
      path: [null, Validators.required],
      title: [null, Validators.required],
      description: [null, Validators.required],
      imagePath: [null, Validators.required]
    });
  }

  loadDiscounts(): void {
    this.discountService.getAllFirebase().subscribe(data => {
      this.adminDiscounts = data as IDiscountResponse[];
    })
  }

  toggleDiscount(): void {
    this.discountsToggle = !this.discountsToggle
  }

  saveDiscount(): void {
    if(this.editStatus) {
      this.discountService.updateFirebase(this.discountForm.value, this.editID).then(() => {
        this.loadDiscounts();
        this.toastr.success('Discount successfully updated');
      })
    } else {
      this.loadDiscounts();
      this.discountService.createFirebase(this.discountForm.value).then(() => {
        this.loadDiscounts();
        this.toastr.success('Discount successfully created');
      })
    }
    this.editStatus = false;
    this.discountForm.reset();
    this.toggleDiscount();
    this.isUploaded = false;
    this.uploadPercent = 0;
  }

  editDiscount(discount: IDiscountResponse): void {
    this.discountForm.patchValue({
      date: this.currentDate,
      name: discount.name,
      path: discount.path,
      title: discount.title,
      description: discount.description,
      imagePath: discount.imagePath
    })
    this.editStatus = true;
    this.editID = discount.id;
    this.toggleDiscount();
    this.isUploaded = true;
  }

  deleteDiscount(discount: IDiscountResponse): void {
    this.discountService.deleteFirebase(discount.id).then(() => {
      this.loadDiscounts();
      this.toastr.success('Discount successfully deleted');
    })
  }

  upload(event: any): void {
    const file = event.target.files[0];
    this.uploadFile('images', file.name, file)
      .then(data => {
        this.discountForm.patchValue({
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
      this.discountForm.patchValue({
        imagePath: null
      });
    })
  }

  valueByControl(control: string): string {
    return this.discountForm.get(control)?.value;
  }

}

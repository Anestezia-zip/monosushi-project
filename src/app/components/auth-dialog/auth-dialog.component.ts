import { Component, OnInit } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { doc, getDoc, Firestore, setDoc } from '@angular/fire/firestore';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ROLE } from 'src/app/shared/constants/role.constant';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { IRegister } from '../../shared/interfaces/interfaces';

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.scss']
})
export class AuthDialogComponent implements OnInit{

  public authLoginForm!: FormGroup;
  public authRegisterForm!: FormGroup;
  public isLogin = false;
  public loginModal = false;
  public checkPassword = false;
  private registerData!: IRegister;

  constructor(
    private auth: Auth,
    private afs: Firestore,
    private router: Router,
    private accountService: AccountService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AuthDialogComponent>
  ){}

  ngOnInit(): void {
    this.initLoginForm();
    this.initRegisterForm();
  }

  initLoginForm(): void {
    this.authLoginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
  }

  initRegisterForm(): void {
    this.authRegisterForm = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      repeatPassword: [null, [Validators.required]]
    });
  }

  toggleModal(): void {
    this.loginModal = !this.loginModal;
  }

  loginUser(): void {
    const { email, password } = this.authLoginForm.value;
    this.login(email, password);
  }

  login(email: string, password: string): void {
    signInWithEmailAndPassword(this.auth, email, password).then(credential => {
      this.getUserData(credential.user.uid);
    }).catch(e => {
      this.toastr.error(e.message);
    })
  }

  getUserData(id: string): void {
    getDoc(doc(this.afs, 'users', id)).then(docSnap => {
      const currentUser: any = { ...docSnap.data(), uid: id };
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      this.accountService.isUserLogin$.next(true)
      this.toastr.success('You successfully login');
      if(currentUser && currentUser['role'] === ROLE.USER) {
        this.router.navigate(['/cabinet/info'])
      } else if(currentUser && currentUser['role'] === ROLE.ADMIN){
        this.router.navigate(['/admin'])
      }
      this.dialogRef.close()
    }, (e) => {
      console.log('error', e);
    })
  }



  registerUser(): void {
    const { email, password } = this.authRegisterForm.value;
    this.registerData = this.authRegisterForm.value;
    this.emailSignUp(email, password).then(() => {
      this.toastr.success('User successfully created');
      this.isLogin = !this.isLogin;
      this.dialogRef.close()
      this.authRegisterForm.reset();
      this.login(email, password);
    }).catch(e => {
      this.toastr.error(e.message);
    })
  }

  async emailSignUp(email: string, password: string): Promise<any> {
    const credential = await createUserWithEmailAndPassword(this.auth, email, password);
    const user = {
      email: credential.user.email,
      firstName: this.registerData.firstName,
      lastName: this.registerData.lastName,
      phoneNumber: this.registerData.phoneNumber,
      address: '',
      orders: [],
      role: 'USER'
    };
    setDoc(doc(this.afs, 'users', credential.user.uid), user)
  }

  checkConfirmedPassword(): void {
    this.checkPassword = this.password.value === this.repeatPass.value;
    if(this.password.value !== this.repeatPass.value) {
      this.authRegisterForm.controls['repeatPassword'].setErrors({
        matchError: 'Passwords do not match'
      })
    }
  }

  get password(): AbstractControl {
    return this.authRegisterForm.controls['password'];
  }

  get repeatPass(): AbstractControl {
    return this.authRegisterForm.controls['repeatPassword'];
  }

  checkVisibilityError(control: string, name: string): boolean | null {
    return this.authRegisterForm.controls[control].errors?.[name]
  }


}
















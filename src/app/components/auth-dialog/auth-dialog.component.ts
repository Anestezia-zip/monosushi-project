import { Component, OnInit } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential } from '@angular/fire/auth';
import { doc, docData , Firestore, setDoc } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ROLE } from 'src/app/shared/constants/role.constant';
import { AccountService } from 'src/app/shared/services/account/account.service';

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
    this.initAuthForm();
  }

  initAuthForm(): void {
    this.authLoginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
    this.authRegisterForm = this.fb.group({
      name: [null, [Validators.required]],
      surname: [null, [Validators.required]],
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
    // this.dialogRef.close({
    //   FormData: this.authForm.value
    // })
    const { email, password } = this.authLoginForm.value;
    this.login(email, password).then(() => {
      this.toastr.success('User successfully login');
      this.dialogRef.close()
    }).catch(e => {
      this.toastr.error(e.message);
    })
  }

  async login(email: string, password: string): Promise<void> {
      const credential = await signInWithEmailAndPassword(this.auth, email, password);
      docData(doc(this.afs, 'users', credential.user.uid)).subscribe(user => {
        const currentUser = { ...user, uid: credential.user.uid };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        if(user && user['role'] === ROLE.USER) {
          this.router.navigate(['/cabinet']);
        } else if(user && user['role'] === ROLE.ADMIN){
          this.router.navigate(['/admin']);
        }
        this.accountService.isUserLogin$.next(true);
      }, (e) => {
        console.log('error', e);
      })
  }

  registerUser(): void {
    const { email, password } = this.authRegisterForm.value;
    this.emailSignUp(email, password).then(() => {
      this.toastr.success('User successfully created');
      this.isLogin = !this.isLogin;
      this.dialogRef.close()
      this.authRegisterForm.reset();
    }).catch(e => {
      this.toastr.error(e.message);
    })
  }

  async emailSignUp(email: string, password: string): Promise<any> {
    const credential = await createUserWithEmailAndPassword(this.auth, email, password);
    const user = {
      email: credential.user.email,
      firstName: '',
      lastName: '',
      phoneNumber: '',
      address: '',
      orders: [],
      role: 'USER'
    };
    setDoc(doc(this.afs, 'users', credential.user.uid), user)
  }

  
}

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthDialogComponent } from './auth-dialog.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {Auth} from "@angular/fire/auth";
import {Firestore} from "@angular/fire/firestore";
import {ToastrService} from "ngx-toastr";

describe('AuthDialogComponent', () => {
  let component: AuthDialogComponent;
  let fixture: ComponentFixture<AuthDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthDialogComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        MatDialogModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: Auth, useValue: {} },
        { provide: Firestore, useValue: {} },
        { provide: ToastrService, useValue: {} },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set checkPassword to true if passwords match and no errors are set', () => {
    component.password.setValue('password123');
    component.repeatPass.setValue('password123');
    component.checkConfirmedPassword();
    expect(component.checkPassword).toBeTrue();
    expect(component.authRegisterForm.controls['repeatPassword'].hasError('matchError')).toBeFalse();
  });

  it('should set checkPassword to false and set error if passwords do not match', () => {
    component.password.setValue('password123');
    component.repeatPass.setValue('password456');
    component.checkConfirmedPassword();
    expect(component.checkPassword).toBeFalse();
    expect(component.authRegisterForm.controls['repeatPassword'].hasError('matchError')).toBeTrue();
  });





});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizationComponent } from './authorization.component';
import {RouterTestingModule} from "@angular/router/testing";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {Auth} from "@angular/fire/auth";
import {Firestore} from "@angular/fire/firestore";
import {ToastrModule, ToastrService} from "ngx-toastr";
import {AccountService} from "../../shared/services/account/account.service";

describe('AuthorizationComponent', () => {
  let component: AuthorizationComponent;
  let fixture: ComponentFixture<AuthorizationComponent>;
  let toastr: ToastrService;
  let accountService: AccountService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorizationComponent ],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        ToastrModule.forRoot()
      ],
      providers: [
        { provide: Auth, useValue: {} },
        { provide: Firestore, useValue: {} },
        { provide: ToastrService, useValue: {} },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorizationComponent);
    component = fixture.componentInstance;
    accountService = TestBed.inject(AccountService)
    toastr = TestBed.inject(ToastrService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize authForm', () => {
    component.ngOnInit();
    expect(component.authForm).toBeDefined();
  });







});

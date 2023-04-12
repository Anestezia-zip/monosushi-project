import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import {AdminComponent} from "./admin.component";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AccountService} from "../shared/services/account/account.service";


describe('MyComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminComponent ],
      imports: [
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should log out', () => {
    spyOn(router, 'navigate');
    component.logOut();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

});

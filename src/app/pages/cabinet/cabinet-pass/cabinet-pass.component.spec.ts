import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CabinetPassComponent } from './cabinet-pass.component';

describe('CabinetPassComponent', () => {
  let component: CabinetPassComponent;
  let fixture: ComponentFixture<CabinetPassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CabinetPassComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CabinetPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

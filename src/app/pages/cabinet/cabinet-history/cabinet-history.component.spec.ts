import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CabinetHistoryComponent } from './cabinet-history.component';
import {NO_ERRORS_SCHEMA} from "@angular/core";

describe('CabinetHistoryComponent', () => {
  let component: CabinetHistoryComponent;
  let fixture: ComponentFixture<CabinetHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CabinetHistoryComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CabinetHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

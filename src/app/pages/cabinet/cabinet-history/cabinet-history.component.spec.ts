import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CabinetHistoryComponent } from './cabinet-history.component';

describe('CabinetHistoryComponent', () => {
  let component: CabinetHistoryComponent;
  let fixture: ComponentFixture<CabinetHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CabinetHistoryComponent ]
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

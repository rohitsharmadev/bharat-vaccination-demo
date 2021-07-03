import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccinationCenterDetailsComponent } from './vaccination-center-details.component';

describe('VaccinationCenterDetailsComponent', () => {
  let component: VaccinationCenterDetailsComponent;
  let fixture: ComponentFixture<VaccinationCenterDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VaccinationCenterDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VaccinationCenterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

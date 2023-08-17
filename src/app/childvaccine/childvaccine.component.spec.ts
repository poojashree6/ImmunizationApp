import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildvaccineComponent } from './childvaccine.component';

describe('ChildvaccineComponent', () => {
  let component: ChildvaccineComponent;
  let fixture: ComponentFixture<ChildvaccineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildvaccineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChildvaccineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

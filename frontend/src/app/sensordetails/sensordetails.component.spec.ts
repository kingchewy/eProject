import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SensordetailsComponent } from './sensordetails.component';

describe('SensordetailsComponent', () => {
  let component: SensordetailsComponent;
  let fixture: ComponentFixture<SensordetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SensordetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SensordetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

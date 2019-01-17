import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CircuitbreakerdetailsComponent } from './circuitbreakerdetails.component';

describe('CircuitbreakerdetailsComponent', () => {
  let component: CircuitbreakerdetailsComponent;
  let fixture: ComponentFixture<CircuitbreakerdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CircuitbreakerdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CircuitbreakerdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

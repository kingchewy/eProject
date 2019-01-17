import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CircuitbreakersComponent } from './circuitbreakers.component';

describe('CircuitbreakersComponent', () => {
  let component: CircuitbreakersComponent;
  let fixture: ComponentFixture<CircuitbreakersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CircuitbreakersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CircuitbreakersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

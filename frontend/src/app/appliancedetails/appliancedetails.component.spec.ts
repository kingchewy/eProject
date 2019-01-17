import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppliancedetailsComponent } from './appliancedetails.component';

describe('AppliancedetailsComponent', () => {
  let component: AppliancedetailsComponent;
  let fixture: ComponentFixture<AppliancedetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppliancedetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppliancedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

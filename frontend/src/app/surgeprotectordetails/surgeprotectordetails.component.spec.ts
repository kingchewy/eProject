import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurgeprotectordetailsComponent } from './surgeprotectordetails.component';

describe('SurgeprotectordetailsComponent', () => {
  let component: SurgeprotectordetailsComponent;
  let fixture: ComponentFixture<SurgeprotectordetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurgeprotectordetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurgeprotectordetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

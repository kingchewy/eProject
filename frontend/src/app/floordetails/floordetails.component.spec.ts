import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FloordetailsComponent } from './floordetails.component';

describe('FloordetailsComponent', () => {
  let component: FloordetailsComponent;
  let fixture: ComponentFixture<FloordetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FloordetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FloordetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppliancecategoriesComponent } from './appliancecategories.component';

describe('AppliancecategoriesComponent', () => {
  let component: AppliancecategoriesComponent;
  let fixture: ComponentFixture<AppliancecategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppliancecategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppliancecategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

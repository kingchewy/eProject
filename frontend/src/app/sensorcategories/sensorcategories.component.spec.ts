import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorcategoriesComponent } from './sensorcategories.component';

describe('SensorcategoriesComponent', () => {
  let component: SensorcategoriesComponent;
  let fixture: ComponentFixture<SensorcategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SensorcategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorcategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

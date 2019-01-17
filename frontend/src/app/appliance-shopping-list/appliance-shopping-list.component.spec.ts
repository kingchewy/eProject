import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplianceShoppingListComponent } from './appliance-shopping-list.component';

describe('ApplianceShoppingListComponent', () => {
  let component: ApplianceShoppingListComponent;
  let fixture: ComponentFixture<ApplianceShoppingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplianceShoppingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplianceShoppingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

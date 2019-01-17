import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurgeProtectorShoppingListComponent } from './surge-protector-shopping-list.component';

describe('SurgeProtectorShoppingListComponent', () => {
  let component: SurgeProtectorShoppingListComponent;
  let fixture: ComponentFixture<SurgeProtectorShoppingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurgeProtectorShoppingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurgeProtectorShoppingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

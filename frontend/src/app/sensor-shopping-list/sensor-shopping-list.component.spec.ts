import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorShoppingListComponent } from './sensor-shopping-list.component';

describe('SensorShoppingListComponent', () => {
  let component: SensorShoppingListComponent;
  let fixture: ComponentFixture<SensorShoppingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SensorShoppingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorShoppingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

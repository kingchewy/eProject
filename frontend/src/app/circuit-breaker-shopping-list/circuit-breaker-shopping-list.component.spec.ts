import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CircuitBreakerShoppingListComponent } from './circuit-breaker-shopping-list.component';

describe('CircuitBreakerShoppingListComponent', () => {
  let component: CircuitBreakerShoppingListComponent;
  let fixture: ComponentFixture<CircuitBreakerShoppingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CircuitBreakerShoppingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CircuitBreakerShoppingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

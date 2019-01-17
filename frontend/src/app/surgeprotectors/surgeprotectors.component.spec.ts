import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurgeprotectorsComponent } from './surgeprotectors.component';

describe('SurgeprotectorsComponent', () => {
  let component: SurgeprotectorsComponent;
  let fixture: ComponentFixture<SurgeprotectorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurgeprotectorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurgeprotectorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectconfigComponent } from './projectconfig.component';

describe('ProjectconfigComponent', () => {
  let component: ProjectconfigComponent;
  let fixture: ComponentFixture<ProjectconfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectconfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectconfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectModelComponent } from './project-model.component';

describe('ProjectModelComponent', () => {
  let component: ProjectModelComponent;
  let fixture: ComponentFixture<ProjectModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

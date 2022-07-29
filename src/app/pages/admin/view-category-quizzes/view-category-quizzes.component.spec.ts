import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCategoryQuizzesComponent } from './view-category-quizzes.component';

describe('ViewCategoryQuizzesComponent', () => {
  let component: ViewCategoryQuizzesComponent;
  let fixture: ComponentFixture<ViewCategoryQuizzesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCategoryQuizzesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCategoryQuizzesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

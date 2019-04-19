import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchedPostsComponent } from './searched-posts.component';

describe('SearchedPostsComponent', () => {
  let component: SearchedPostsComponent;
  let fixture: ComponentFixture<SearchedPostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchedPostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchedPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

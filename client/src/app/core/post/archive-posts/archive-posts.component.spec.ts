import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivePostsComponent } from './archive-posts.component';

describe('ArchivePostsComponent', () => {
  let component: ArchivePostsComponent;
  let fixture: ComponentFixture<ArchivePostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchivePostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivePostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

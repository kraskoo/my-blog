import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeLikedPostComponent } from './resume-liked-post.component';

describe('ResumeLikedPostComponent', () => {
  let component: ResumeLikedPostComponent;
  let fixture: ComponentFixture<ResumeLikedPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumeLikedPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumeLikedPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

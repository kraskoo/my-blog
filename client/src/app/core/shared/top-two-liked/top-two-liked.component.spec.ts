import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopTwoLikedComponent } from './top-two-liked.component';

describe('TopTwoLikedComponent', () => {
  let component: TopTwoLikedComponent;
  let fixture: ComponentFixture<TopTwoLikedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopTwoLikedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopTwoLikedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

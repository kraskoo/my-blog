import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RightSideCommonComponent } from './right-side-common.component';

describe('RightSideCommonComponent', () => {
  let component: RightSideCommonComponent;
  let fixture: ComponentFixture<RightSideCommonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RightSideCommonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RightSideCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

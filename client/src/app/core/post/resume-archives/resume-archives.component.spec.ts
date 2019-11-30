import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeArchivesComponent } from './resume-archives.component';

describe('ResumeArchivesComponent', () => {
  let component: ResumeArchivesComponent;
  let fixture: ComponentFixture<ResumeArchivesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumeArchivesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumeArchivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetAdminRoleComponent } from './set-admin-role.component';

describe('SetAdminRoleComponent', () => {
  let component: SetAdminRoleComponent;
  let fixture: ComponentFixture<SetAdminRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetAdminRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetAdminRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

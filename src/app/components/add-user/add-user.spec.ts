import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSingleUser } from './add-user';

describe('AddSingleUser', () => {
  let component: AddSingleUser;
  let fixture: ComponentFixture<AddSingleUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSingleUser],
    }).compileComponents();

    fixture = TestBed.createComponent(AddSingleUser);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

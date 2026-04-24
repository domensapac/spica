import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAbsence } from './add-absence';

describe('AddAbsence', () => {
  let component: AddAbsence;
  let fixture: ComponentFixture<AddAbsence>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAbsence],
    }).compileComponents();

    fixture = TestBed.createComponent(AddAbsence);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

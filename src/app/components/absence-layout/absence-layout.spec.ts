import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsenceLayout } from './absence-layout';

describe('AbsenceLayout', () => {
  let component: AbsenceLayout;
  let fixture: ComponentFixture<AbsenceLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbsenceLayout],
    }).compileComponents();

    fixture = TestBed.createComponent(AbsenceLayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

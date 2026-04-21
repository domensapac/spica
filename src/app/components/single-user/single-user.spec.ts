import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleUserComponent } from './single-user';

describe('SingleUserComponent', () => {
  let component: SingleUserComponent;
  let fixture: ComponentFixture<SingleUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleUserComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SingleUserComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

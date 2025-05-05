import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentBookingsComponent } from './current-bookings.component';

describe('CurrentBookingsComponent', () => {
  let component: CurrentBookingsComponent;
  let fixture: ComponentFixture<CurrentBookingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentBookingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

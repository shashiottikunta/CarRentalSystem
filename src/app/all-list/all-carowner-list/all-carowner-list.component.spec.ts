import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCarownerListComponent } from './all-carowner-list.component';

describe('AllCarownerListComponent', () => {
  let component: AllCarownerListComponent;
  let fixture: ComponentFixture<AllCarownerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllCarownerListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllCarownerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

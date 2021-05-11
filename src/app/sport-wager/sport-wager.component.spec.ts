import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportWagerComponent } from './sport-wager.component';

describe('SportWagerComponent', () => {
  let component: SportWagerComponent;
  let fixture: ComponentFixture<SportWagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SportWagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SportWagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

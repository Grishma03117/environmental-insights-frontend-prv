import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherEventsComponent } from './weather-events.component';

describe('WeatherEventsComponent', () => {
  let component: WeatherEventsComponent;
  let fixture: ComponentFixture<WeatherEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherEventsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeatherEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

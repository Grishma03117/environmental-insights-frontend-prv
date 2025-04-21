import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherForecastDaysComponent } from './weather-forecast-days.component';

describe('WeatherForecastDaysComponent', () => {
  let component: WeatherForecastDaysComponent;
  let fixture: ComponentFixture<WeatherForecastDaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherForecastDaysComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeatherForecastDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

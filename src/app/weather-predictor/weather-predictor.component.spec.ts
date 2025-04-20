import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherPredictorComponent } from './weather-predictor.component';

describe('WeatherPredictorComponent', () => {
  let component: WeatherPredictorComponent;
  let fixture: ComponentFixture<WeatherPredictorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherPredictorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeatherPredictorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

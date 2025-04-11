import { TestBed } from '@angular/core/testing';

import { WeatherEventsService } from './weather-events.service';

describe('WeatherEventsService', () => {
  let service: WeatherEventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

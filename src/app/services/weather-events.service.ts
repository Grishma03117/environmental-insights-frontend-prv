import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherEventsService {
  constructor(private http: HttpClient) {}

  getWeatherEvent(
    city: string,
    startTime: string,
    endTime: string
  ): Observable<any> {
    let params = new HttpParams()
      .set('city', city)
      .set('startTime', startTime)
      .set('endTime', endTime);

    return this.http.get<{ message: string }>(
      'https://environmental-insights-api-dns.westus2.azurecontainer.io:8000/weather-events',
      { params }
    );
  }
}

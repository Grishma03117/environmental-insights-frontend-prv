import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherEventsService {

  private apiUrl = 'http://127.0.0.1:5000/weather-events';  // Flask backend URL

  constructor(private http: HttpClient) { }

  getWeatherEvent(city: string, startTime: string, endTime: string): Observable<any> {
    let params = new HttpParams()
      .set('city', city)
      .set('start_time', startTime)
      .set('end_time', endTime);

    return this.http.get<{message: string}>(this.apiUrl, { params });
  }
}

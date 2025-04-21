import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, forkJoin, map, Observable, of } from 'rxjs';

@Component({
  selector: 'app-weather-forecast-days',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './weather-forecast-days.component.html',
  styleUrl: './weather-forecast-days.component.scss',
})
export class WeatherForecastDaysComponent {
  cityName: string = '';
  numberOfDays: number = 1;
  forecastData: any[] = [];
  error: string | null = null;

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  fetchClimateForecast() {
    this.error = null;
    const apiKey = '28d3a133b74fbfbe5297938298848189';
    const url = `https://pro.openweathermap.org/data/2.5/forecast/climate?q=${this.cityName}&appid=${apiKey}&cnt=${this.numberOfDays}`;

    if (
      ![
        'Portland',
        'Las Vegas',
        'Kansas City',
        'Minneapolis',
        'Indianapolis',
        'Detroit',
        'Charlotte',
        'Pittsburgh',
        'New York',
        'San Francisco',
        'Los Angeles',
        'San Diego',
      ].includes(this.cityName)
    ) {
      this.error = 'This region is not supported for prediction';
      this.forecastData = [];
      return;
    }

    this.http.get(url).subscribe({
      next: (response: any) => {
        const climateData = response.list || [];
        this.fetchModelPrediction(this.cityName, climateData).subscribe(
          (value) => {
            console.log('**updating ui val with', value);
            this.forecastData = [...value];
            this.cdr.markForCheck();
          }
        );
      },
      error: () => {
        this.error = 'Could not fetch data. Please check the inputs.';
        this.forecastData = [];
      },
    });
  }

  fetchModelPrediction(city: string, forecasts: any[]): Observable<any[]> {
    console.log('***forecaset lenght', forecasts.length);
    if (!forecasts.length) {
      return of([]);
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const requests = forecasts.map((forecast) => {
      const dt = new Date(forecast.dt * 1000);
      const startTime = new Date(dt.setHours(0, 0, 0, 0))
        .toISOString()
        .split('.')[0];
      const endTime = new Date(dt.setHours(23, 59, 59, 599))
        .toISOString()
        .split('.')[0];

      const body = {
        city,
        humidity: forecast.humidity,
        pressure: forecast.pressure,
        temperature: (forecast.temp.min + forecast.temp.max) / 2,
        wind_direction: forecast.deg,
        wind_speed: forecast.speed,
        startTime,
        endTime,
      };

      return this.http
        .post<any>(
          'https://environmental-insights-api-app-ft.azurewebsites.net/predict',
          body,
          { headers }
        )
        .pipe(
          map((response) => {
            const isEventPossible =
              response.top_3_predictions?.[0]?.probability >= 0.75;
            return {
              ...forecast,
              top_3_predictions: response.top_3_predictions || [
                { weatherEvent: '--', severity: '--', probability: '--' },
                { weatherEvent: '--', severity: '--', probability: '--' },
                { weatherEvent: '--', severity: '--', probability: '--' },
              ],
              weatherEvent: isEventPossible
                ? response.top_3_predictions?.[0]?.type || '--'
                : 'Safe Weather',
              severity: isEventPossible
                ? response.top_3_predictions?.[0]?.severity || '--'
                : 'N/A',
              probability: isEventPossible
                ? `${response.top_3_predictions?.[0]?.probability * 100}%` ||
                  '--'
                : 'N/A',
            };
          }),
          catchError(() =>
            of({
              ...forecast,
              weatherEvent: '',
              severity: '',
            })
          )
        );
    });

    return forkJoin(requests); // this returns Observable<any[]>

    // forecasts.map((forecast) => {
    //   const startTime = new Date(
    //     new Date(forecast.dt * 1000).setHours(0, 0, 0, 0)
    //   )
    //     .toISOString()
    //     .split('.')[0];
    //   const endTime = new Date(
    //     new Date(forecast.dt * 1000).setHours(23, 59, 59, 599)
    //   )
    //     .toISOString()
    //     .split('.')[0];
    //   const body = {
    //     city,
    //     humidity: forecast.humidity,
    //     pressure: forecast.pressure,
    //     temperature: (forecast.temp.min + forecast.temp.max) / 2,
    //     wind_direction: forecast.deg,
    //     wind_speed: forecast.speed,
    //     startTime,
    //     endTime,
    //   };
    //   console.log('***Query body', body);
    //   this.http
    //     .post<any>(
    //       'http://environmental-insights-api-dns.westus2.azurecontainer.io:8000/predict',
    //       body,
    //       { headers }
    //     )
    //     .subscribe({
    //       next: (response) => {
    //         return {
    //           ...forecast,
    //           weatherEvent: response.top_3_predictions[0].type,
    //           severity: response.top_3_predictions[0].severity,
    //         };
    //       },
    //       error: (error) => {
    //         console.error('Prediction error:', error);
    //         return { ...forecast, weatherEvent: '', severity: '' };
    //       },
    //     });
    // });
    // return forecasts;
  }
}

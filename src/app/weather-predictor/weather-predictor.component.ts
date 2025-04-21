import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-weather-predictor',
  templateUrl: './weather-predictor.component.html',
  styleUrl: './weather-predictor.component.scss',
  standalone: true,
  imports: [CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WeatherPredictorComponent {
  input: any = {
    city: '',
    humidity: null,
    pressure: null,
    temperature: null,
    wind_direction: null,
    wind_speed: null,
    startTime: '',
    endTime: '',
  };

  predictions: any[] = [];

  constructor(private http: HttpClient) {}

  submit() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const body = {
      ...this.input,
      startTime: this.input.startTime,
      endTime: this.input.endTime,
    };

    this.http
      .post<any>(
        'https://environmental-insights-api-app-ft.azurewebsites.net/predict',
        body,
        { headers }
      )
      .subscribe({
        next: (response) => {
          this.predictions = response.top_3_predictions;
        },
        error: (error) => {
          console.error('Prediction error:', error);
          alert('Failed to get prediction from the API.');
        },
      });
  }
}

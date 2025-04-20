import { Component, inject, OnInit } from '@angular/core';
import { WeatherEventsService } from '../services/weather-events.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-weather-events',
  imports: [CommonModule, FormsModule],
  templateUrl: './weather-events.component.html',
  styleUrl: './weather-events.component.scss',
})
export class WeatherEventsComponent implements OnInit {
  message: string = '';
  city: string = '';
  startTime: string = '';
  endTime: string = '';
  weatherEventData: any;
  #weatherEventService = inject(WeatherEventsService);

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // this.http
    //   .get<{ message: string }>('http://127.0.0.1:5000/api')
    //   .subscribe((response) => {
    //     this.message = response.message;
    //   });
    // this.fetchWeatherData(this.city, this.startTime, this.endTime)
  }

  fetchWeatherData(city: string, startTime: any, endTime: any) {
    this.#weatherEventService
      .getWeatherEvent(city, startTime, endTime)
      .subscribe({
        next: (data) => {
          this.weatherEventData = data;
        },
        error: (error) => {
          console.error('Fetching error:', error);
          alert('Failed to get weather events from the API.');
        },
      });
  }
}

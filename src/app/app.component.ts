import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { WeatherEventsService } from './services/weather-events.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule, FormsModule],
})
export class AppComponent implements OnInit {
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
      .subscribe((data) => {
        console.log('****FOUND DATA as ', data);
        this.weatherEventData = data;
        if(this.weatherEventData.humidity == "")
          console.log(this.weatherEventData);
      });
  }
}

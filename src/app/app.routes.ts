import { Routes } from '@angular/router';
import { WeatherPredictorComponent } from './weather-predictor/weather-predictor.component'; // Adjust path as needed
import { HomeComponent } from './home/home.component';
import { WeatherEventsComponent } from './weather-events/weather-events.component';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent, title: 'Home Page' },
  {
    path: 'predictions',
    component: WeatherPredictorComponent,
    title: 'Prediction Page',
  },
  {
    path: 'weather-events',
    component: WeatherEventsComponent,
    title: 'Weather Events Page',
  }
];

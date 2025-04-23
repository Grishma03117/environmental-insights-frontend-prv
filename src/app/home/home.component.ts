import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private router: Router, private http: HttpClient) {}

  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }

  trainModel() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const body = {};
    this.http.post<any>(
      'https://environmental-insights-main-app.azurewebsites.net/model-train',
      body,
      { headers }
    ).subscribe({
      next: (response: any) => {
        console.log('Response recieved as', response);
      },
      error: () => {
        console.log('Error');
      },
    });
  }

  dataPreprocess() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const body = {};
    this.http.post<any>(
      'https://environmental-insights-main-app.azurewebsites.net/data-preprocess',
      body,
      { headers }
    ).subscribe({
      next: (response: any) => {
        console.log('Response recieved as', response);
      },
      error: () => {
        console.log('Error');
      },
    });
  }
}

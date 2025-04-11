import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule
  ],
  providers: [
    HttpClient
  ],
  exports: [
    CommonModule
  ]
})
export class AppCommonModule { }

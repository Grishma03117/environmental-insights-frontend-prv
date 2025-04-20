import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
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

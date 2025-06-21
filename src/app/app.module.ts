// src/app/app.module.ts
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    BrowserModule
    // ← no AppComponent or other components here
  ]
})
export class AppModule {}

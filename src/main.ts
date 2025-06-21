// src/main.ts
import 'zone.js'; 
import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom }  from '@angular/core';
import { BrowserModule }        from '@angular/platform-browser';
import { NgsRevealModule }      from 'ngx-scrollreveal';
import { AppComponent }         from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      NgsRevealModule      // ← bring in the non-standalone module here
    )
  ]
}).catch(err => console.error(err));

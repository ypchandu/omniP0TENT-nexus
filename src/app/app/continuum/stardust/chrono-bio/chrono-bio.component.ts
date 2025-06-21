import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  // ← import this

@Component({
  selector: 'app-chrono-bio',
  standalone: true,
  imports: [ CommonModule ],                  // ← add here
  templateUrl: './chrono-bio.component.html',
  styleUrls: ['./chrono-bio.component.css']
})
export class ChronoBioComponent { … }

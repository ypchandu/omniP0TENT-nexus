import { Component } from '@angular/core';

@Component({
  selector: 'app-chrono-bio',
  templateUrl: './chrono-bio.component.html',
  styleUrls: ['./chrono-bio.component.css'],
})
export class ChronoBioComponent {
  experienceYears   = 2;  // your real years
  projectsCompleted = 5;  // your real projects
  impactLiftPercent = 15; // your real % lift
}

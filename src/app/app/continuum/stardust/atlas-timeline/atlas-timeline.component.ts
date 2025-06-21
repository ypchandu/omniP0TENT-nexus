import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  // ← import

@Component({
  selector: 'app-atlas-timeline',
  standalone: true,
  imports: [ CommonModule ],                  // ← add
  templateUrl: './atlas-timeline.component.html',
  styleUrls: ['./atlas-timeline.component.css']
})
export class AtlasTimelineComponent { … }

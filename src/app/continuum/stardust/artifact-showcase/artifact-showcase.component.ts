import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionParticlesComponent } from '../shared/section-particles/section-particles.component';
@Component({
  selector: 'app-artifact-showcase',
  imports: [
    CommonModule,
    SectionParticlesComponent  
  ],
  templateUrl: './artifact-showcase.component.html',
  styleUrls: ['./artifact-showcase.component.css']
})
export class ArtifactShowcaseComponent {
  currentPage = 0;

  prevPage() {
    this.currentPage = this.currentPage === 0 ? 1 : this.currentPage - 1;
  }

  nextPage() {
    this.currentPage = this.currentPage === 1 ? 0 : this.currentPage + 1;
  }
}

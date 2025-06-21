import { Component } from '@angular/core';

@Component({
  selector: 'app-artifact-showcase',
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

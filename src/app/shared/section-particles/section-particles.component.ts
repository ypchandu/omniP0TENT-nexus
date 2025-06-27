import { Component, AfterViewInit } from '@angular/core';
declare var particlesJS: any;

@Component({
  selector: 'app-section-particles',
  standalone: true,
  templateUrl: './section-particles.component.html',
  styleUrls: ['./section-particles.component.css']
})
export class SectionParticlesComponent implements AfterViewInit {
  ngAfterViewInit(): void {console.log("Particle field mounted");
    particlesJS('section-particles', {
      particles: {
        number: { value: 40 },
        size: { value: 3 },
        color: { value: "#48b5e8" },
        line_linked: {
          enable: true,
          color: "#b548e8",
          opacity: 0.3
        },
        move: { speed: 1 }
      },
      interactivity: {
        events: {
          onhover: { enable: true, mode: "repulse" }
        }
      }
    });
  }
}

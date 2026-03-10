import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionParticlesComponent } from '../shared/section-particles/section-particles.component';
interface Project {
  title: string;
  shortDesc: string;
  image: string;
  githubLink: string;
  insights: string[];
}

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
  projects: Project[] = [
    {
      title: 'ASITEM Architectural',
      shortDesc: 'Deep learning model transforming architectural sketches into precise 3D models.',
      image: 'assets/projects/ASITEM.png',
      githubLink: 'https://github.com/ypchandu',
      insights: [
        'Transformed architectural design workflows with a state-of-the-art Deep Learning approach.',
        'Eliminates the manual effort of converting 2D sketches into 3D models.',
        'Leveraged advanced neural networks to recognize spatial structures and generate accurate models.'
      ]
    },
    {
      title: 'Netflix Data Exploration',
      shortDesc: 'Analysis of Netflix content to guide strategic production decisions.',
      image: 'assets/projects/Netflix logo.png',
      githubLink: 'https://github.com/ypchandu/NETFLIX_ANALYSIS',
      insights: [
        'Explored over 10,000+ movies & TV shows, isolating trends in rating, release year, and duration.',
        'Visualized Univariate & Bivariate distributions to pinpoint optimal launch strategies.',
        'Investigated actor and director trends across genres to guide future production investments.',
        'Recommended actionable business insights focusing on regional content variations and seasonality.'
      ]
    },
    {
      title: 'Aerofit Customer Profiling',
      shortDesc: 'Descriptive analytics & probability computation for fitness equipment.',
      image: 'assets/projects/Aerofit - Descriptive Statistics & Probability.jpg',
      githubLink: 'https://github.com/ypchandu/Aerofit---Descriptive-Statistics-Probability',
      insights: [
        'Analyzed consumer behavior for three treadmill models (KP281, KP481, KP781) using detailed demographic data.',
        'Computed conditional and marginal probabilities mapping characteristics like age, gender, and income to purchase likelihood.',
        'Profiled target audiences using statistical visualizations, identifying outliers in expected fitness activity.',
        'Generated precise marketing recommendations to enhance correct product-to-consumer targeting.'
      ]
    },
    {
      title: 'Target SQL Business Case',
      shortDesc: 'Extensive SQL-driven insights derived from 100,000 e-commerce orders.',
      image: 'assets/projects/Target SQL Case study.jpg',
      githubLink: 'https://github.com/ypchandu/Target-SQL',
      insights: [
        'Crafted complex SQL queries spanning 8 interconnected relational tables (customers, products, geolocation, etc.).',
        'Exposed granular economic impacts comparing delivery speeds vs. actual shipping estimates across Brazilian states.',
        'Visualized monthly seasonality trends, pinpointing peak ordering periods (Dawn vs. Morning vs. Night).',
        'Evaluated average freight values and correlated payment installment patterns with customer retention.'
      ]
    },
    {
      title: 'Voice Recognisation Home Automation (IOT)',
      shortDesc: 'IoT-based home automation system controlled via voice commands.',
      image: 'assets/projects/IOT.jpeg',
      githubLink: 'https://github.com/ypchandu',
      insights: [
        'Designed a voice-controlled home automation system using IoT technologies.',
        'Integrated natural language processing for accurate voice command recognition.',
        'Developed hardware modules to interface with home appliances seamlessly.',
        'Improved energy efficiency and accessibility for smart home environments.'
      ]
    }
  ];

  selectedProject: Project | null = null;

  isModalOpen: boolean = false;

  openModal(project: Project, event: Event): void {
    event.preventDefault();
    this.selectedProject = project;
    this.isModalOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeModal(): void {
    this.selectedProject = null;
    this.isModalOpen = false;
    document.body.style.overflow = '';
  }
}

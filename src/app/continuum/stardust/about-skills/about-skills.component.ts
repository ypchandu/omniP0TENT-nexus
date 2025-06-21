import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-about-skills',
  templateUrl: './about-skills.component.html',
  styleUrls: ['./about-skills.component.css']
})
export class AboutSkillsComponent implements AfterViewInit {
  @ViewChild('carousel', { static: true }) carousel!: ElementRef<HTMLElement>;

  intro = `I’m a data-driven professional with a background in research-led business development. Over the last two years I’ve built automated pipelines, custom analytics engines, and real-time dashboards that drive revenue growth and operational excellence. Now, I’m fully focused on data analysis & data science—applying Python, PySpark, and Tableau to uncover patterns, optimize processes, and help organizations make smarter decisions.`;

  showProg = false;
  showDb = false;
  showCloud = false;
  showTools = false;

  ngAfterViewInit() {
    const el = this.carousel.nativeElement;
    const panels = el.querySelectorAll('.panel');
    const totalPanels = panels.length;
    const scrollWidth = window.innerWidth * (totalPanels - 1);

    gsap.to(el, {
      x: -scrollWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top top',
        end: `+=${scrollWidth}`,
        scrub: true,
        pin: true,
        anticipatePin: 1
      }
    });
  }

  toggleProg()   { this.showProg   = !this.showProg; }
  toggleDb()     { this.showDb     = !this.showDb; }
  toggleCloud()  { this.showCloud  = !this.showCloud; }
  toggleTools()  { this.showTools  = !this.showTools; }
}

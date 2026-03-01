import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChild
} from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CommonModule } from '@angular/common';
// Update the path below to the correct relative location of section-particles.component
// Update the path below to the correct relative location of section-particles.component
import { SectionParticlesComponent } from '../shared/section-particles/section-particles.component';


gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-chrono-bio',
  standalone: true,
  imports: [
    CommonModule,
    SectionParticlesComponent
  ],
  templateUrl: './chrono-bio.component.html',
  styleUrls: ['./chrono-bio.component.css']
})
export class ChronoBioComponent implements AfterViewInit {
  @ViewChild('carousel', { static: true })
  carousel!: ElementRef<HTMLDivElement>;



  stats = [
    { icon: 'fas fa-briefcase', value: 4, suffix: '+', label: 'Experience' },
    { icon: 'fas fa-project-diagram', value: 5, suffix: '+', label: 'Projects' },
    { icon: 'fas fa-certificate', value: 4, suffix: '+', label: 'Certificates' },
  ];

  ngAfterViewInit() {
    const wrap = this.carousel.nativeElement;
    const panels = wrap.querySelectorAll<HTMLElement>('.panel');
    const container = wrap.parentElement as HTMLElement;

    // Wait till browser renders to measure correctly
    requestAnimationFrame(() => {
      // Measure total width
      const totalScrollWidth = wrap.scrollWidth - window.innerWidth;

      // Measure tallest panel
      let maxHeight = 0;
      panels.forEach(panel => {
        maxHeight = Math.max(maxHeight, panel.scrollHeight);
      });
      container.style.height = `${maxHeight}px`;

      setTimeout(() => {
        const updatedMaxHeight = Array.from(panels).reduce((max, panel) =>
          Math.max(max, panel.scrollHeight), 0);

        container.style.height = `${updatedMaxHeight}px`;
      }, 1500);
      // Set full scroll container height


      // Animate horizontal scroll
      gsap.to(wrap, {
        x: -totalScrollWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: `+=${totalScrollWidth}`,
          scrub: 1.25,
          pin: true,
          anticipatePin: 1
        }
      });

      // Panel activate animation
      ScrollTrigger.create({
        trigger: panels[0],
        start: 'top center',
        onEnter: () => panels[0].classList.add('active'),
        once: true
      });

      // Count-up animation
      const statCards = wrap.querySelectorAll<HTMLElement>('.stat-card');
      statCards.forEach((card, index) => {
        const numberEl = card.querySelector('.stat-number') as HTMLElement;
        const endValue = this.stats[index].value;

        ScrollTrigger.create({
          trigger: wrap.querySelector('.about-heading'),
          start: 'top 85%',
          once: true,
          onEnter: () => {
            const obj = { val: 0 };
            gsap.fromTo(
              obj,
              { val: 0 },
              {
                val: endValue,
                duration: 2,
                ease: 'power2.out',
                onUpdate: () => {
                  numberEl.innerText = Math.floor(obj.val) + '+';
                }
              }
            );
          }
        });
      });

      // Animate skill boxes
      const skillBoxes = wrap.querySelectorAll('.skill-box');
      skillBoxes.forEach((box, i) => {
        gsap.from(box, {
          opacity: 0,
          scale: 0.6,
          y: 100,
          duration: 1.4,
          delay: i * 0.25 + 0.4,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: box,
            start: 'top 80%',
            once: true,
            onEnter: () => box.classList.add('visible')
          }
        });
      });

      // Certifications animation
      const certCards = wrap.querySelectorAll('.cert-card');


      certCards.forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 80, scale: 0.85 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            delay: i * 0.15,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              once: true // 
            }
          }
        );
      });

    });
  }
}

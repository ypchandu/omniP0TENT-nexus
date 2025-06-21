import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import Typewriter from 'typewriter-effect/dist/core';

@Component({
  selector: 'app-quantum-hero',
  templateUrl: './quantum-hero.component.html',
  styleUrls: ['./quantum-hero.component.css']
})
export class QuantumHeroComponent implements AfterViewInit {
  @ViewChild('typewriter', { static: true }) typewriterEl!: ElementRef;

  ngAfterViewInit() {
    new Typewriter(this.typewriterEl.nativeElement, {
      loop: true,
      delay: 75,
      deleteSpeed: 50,
      cursor: '█'
    })
    .typeString("Hi, I'm YANGALA PREM CHAND")
    .pauseFor(2000)
    .deleteAll()
    .typeString('Data Analytics Enthusiast')
    .pauseFor(2000)
    .deleteAll()
    .typeString('Full-Stack Developer')
    .pauseFor(2000)
    .start();
  }
}

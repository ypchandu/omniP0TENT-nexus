import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  HostListener
} from '@angular/core';

@Component({
  selector: 'app-hero-video',
  templateUrl: './hero-video.component.html',
  styleUrls: ['./hero-video.component.css']
})
export class HeroVideoComponent implements AfterViewInit {
  @ViewChild('introVid') introVid!: ElementRef<HTMLVideoElement>;

  scrolled = false;
  isMuted = true;

  displayedText = '';
  fullTexts = [
    'YANGALA PREM CHAND',
    'Data Analyst',
    'ML Enthusiast',
    'Product Strategist',
    'AI Explorer',
    'Business Intelligence Analyst',
    'Data Storyteller',
    'Statistical Modeler',
    'Machine Learning Engineer',
    'Predictive Analytics Developer',
    'NLP Researcher',
    'Big Data Engineer',
    'Data Visualization Expert',
    'Insight Architect',
    'Quantitative Analyst',
    'Decision Scientist',
    'Cloud Data Engineer',
    'Deep Learning Practitioner',
    'Time Series Analyst',
    'AI-Driven Strategist'
  ];

  currentIndex = 0;
  charIndex = 0;
  typingInterval: any;

  ngAfterViewInit(): void {
    // Load saved mute state from localStorage
    const savedMute = localStorage.getItem('videoMuted');
    this.isMuted = savedMute === null ? true : savedMute === 'true';

    const video = this.introVid.nativeElement;
    video.muted = this.isMuted;
    if ('requestVideoFrameCallback' in video) {
    video.requestVideoFrameCallback(() => {
      document.body.classList.add('video-ready');
    });
  } else {
    // Fallback for older browsers
    setTimeout(() => document.body.classList.add('video-ready'), 1000);
  }

    this.retryAutoplay();
    this.startTyping();
  }

  retryAutoplay(): void {
    const video = this.introVid.nativeElement;

    const tryPlay = () => {
      const playPromise = video.play();
      if (playPromise) {
        playPromise
          .then(() => {})
          .catch(() => {
            document.addEventListener(
              'click',
              () => video.play().catch(() => {}),
              { once: true }
            );
          });
      }
    };

    // Try play after short delay (DOM fully ready)
    setTimeout(() => tryPlay(), 500);

    // Retry on first scroll too
    window.addEventListener('scroll', tryPlay, { once: true });
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    this.scrolled = window.scrollY > 30;
  }

  toggleMute(): void {
    const video = this.introVid.nativeElement;
    this.isMuted = !this.isMuted;
    video.muted = this.isMuted;
    localStorage.setItem('videoMuted', this.isMuted.toString());
  }

  startTyping(): void {
    const type = () => {
      const text = this.fullTexts[this.currentIndex];
      if (this.charIndex < text.length) {
        this.displayedText += text[this.charIndex++];
      } else {
        clearInterval(this.typingInterval);
        setTimeout(() => {
          this.charIndex = 0;
          this.displayedText = '';
          this.currentIndex = (this.currentIndex + 1) % this.fullTexts.length;
          this.typingInterval = setInterval(type, 100);
        }, 2000);
      }
    };

    this.typingInterval = setInterval(type, 100);
  }
}

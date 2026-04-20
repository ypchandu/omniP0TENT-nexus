import {
  Component,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  HostListener,
  NgZone
} from '@angular/core';

@Component({
  selector: 'app-hero-video',
  templateUrl: './hero-video.component.html',
  styleUrls: ['./hero-video.component.css']
})
export class HeroVideoComponent implements AfterViewInit, OnDestroy {
  @ViewChild('introVid') introVid!: ElementRef<HTMLVideoElement>;

  scrolled = false;
  isMuted = true;

  displayedText = '';
  fullTexts = [
    'YANGALA PREM CHAND',
    'YANGALA PREM CHAND',
    'YANGALA PREM CHAND',
    'YANGALA PREM CHAND',
    'Data Analyst',
    'ML Enthusiast',
    'Product Strategist',
    'AI Explorer',
    'Business Intelligence Analyst',
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
  private typingTimer: any = null;
  private rafId: number | null = null;
  private scrollBound = false;

  constructor(private zone: NgZone) {}

  ngAfterViewInit(): void {
    const video = this.introVid?.nativeElement;
    if (!video) return;

    // Ensure video is muted for autoplay compliance
    video.muted = true;
    video.playsInline = true;

    // Use requestAnimationFrame for smooth initial load
    requestAnimationFrame(() => {
      // Try to play immediately
      const playPromise = video.play();
      if (playPromise) {
        playPromise
          .then(() => {
            // Video started - reveal overlay content
            this.revealContent();
          })
          .catch(() => {
            // Autoplay blocked - try on first interaction
            this.setupFallbackPlay(video);
          });
      }
    });

    // Start typing animation (runs outside Angular zone for performance)
    this.zone.runOutsideAngular(() => {
      this.startTyping();
    });
  }

  ngOnDestroy(): void {
    if (this.typingTimer) {
      clearTimeout(this.typingTimer);
      this.typingTimer = null;
    }
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  private revealContent(): void {
    // Use requestVideoFrameCallback if available for precise sync
    const video = this.introVid.nativeElement;
    if ('requestVideoFrameCallback' in video) {
      (video as any).requestVideoFrameCallback(() => {
        document.body.classList.add('video-ready');
      });
    } else {
      // Fallback: reveal after first frame paints
      requestAnimationFrame(() => {
        document.body.classList.add('video-ready');
      });
    }
  }

  private setupFallbackPlay(video: HTMLVideoElement): void {
    // Reveal content even if video hasn't started
    setTimeout(() => document.body.classList.add('video-ready'), 800);

    const tryPlay = () => {
      video.play().catch(() => {});
      document.removeEventListener('click', tryPlay);
      document.removeEventListener('touchstart', tryPlay);
      document.removeEventListener('scroll', tryPlay);
    };

    document.addEventListener('click', tryPlay, { once: true, passive: true });
    document.addEventListener('touchstart', tryPlay, { once: true, passive: true });
    document.addEventListener('scroll', tryPlay, { once: true, passive: true });
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    this.scrolled = window.scrollY > 30;
  }

  toggleMute(): void {
    const video = this.introVid.nativeElement;
    this.isMuted = !this.isMuted;
    video.muted = this.isMuted;
  }

  startTyping(): void {
    const typeNextChar = () => {
      const text = this.fullTexts[this.currentIndex];
      if (this.charIndex < text.length) {
        this.charIndex++;
        // Use zone.run only when we need to update the view
        this.zone.run(() => {
          this.displayedText = text.substring(0, this.charIndex);
        });
        this.typingTimer = setTimeout(typeNextChar, 100);
      } else {
        // Finished typing current text, pause then clear and move to next
        this.typingTimer = setTimeout(() => {
          this.charIndex = 0;
          this.zone.run(() => {
            this.displayedText = '';
          });
          this.currentIndex = (this.currentIndex + 1) % this.fullTexts.length;
          this.typingTimer = setTimeout(typeNextChar, 100);
        }, 2000);
      }
    };

    this.typingTimer = setTimeout(typeNextChar, 100);
  }
}

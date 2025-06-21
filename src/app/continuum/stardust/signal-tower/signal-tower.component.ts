import {
  Component,
  AfterViewInit,
  ElementRef,
  Renderer2,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-signal-tower',
  templateUrl: './signal-tower.component.html',
  styleUrls: ['./signal-tower.component.css']
})
export class SignalTowerComponent implements AfterViewInit {
  // 1️⃣ Hook up the video
  @ViewChild('footerVid', { static: true })
  footerVid!: ElementRef<HTMLVideoElement>;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngAfterViewInit(): void {
    // initialize all your features
    this.initFormInteractions();
    this.createParticleField();
    this.initButtonEscape();

    // finally, force the video to autoplay
    this.retryAutoplay(this.footerVid.nativeElement);
  }

  /** Force-play a muted video, retrying on click/scroll if blocked */
  private retryAutoplay(video: HTMLVideoElement) {
    const tryPlay = () => {
      video.load();
      const playPromise = video.play();
      if (playPromise && playPromise.catch) {
        playPromise.catch(() => {
          // if autoplay is blocked, retry once user interacts
          document.addEventListener('click', tryPlay, { once: true });
          window.addEventListener('scroll', tryPlay, { once: true });
        });
      }
    };
    // small delay to ensure DOM is ready
    setTimeout(tryPlay, 300);
  }

  /** Fancy “focus” effect on inputs/textarea */
  private initFormInteractions(): void {
    const inputs = this.el.nativeElement.querySelectorAll('input, textarea');
    inputs.forEach((input: HTMLElement) => {
      this.renderer.listen(input, 'focus', () => {
        this.renderer.addClass(input, 'focused');
      });
      this.renderer.listen(input, 'blur', () => {
        if (!(input as HTMLInputElement).value) {
          this.renderer.removeClass(input, 'focused');
        }
      });
    });
  }

  /** Particle background field in the contact section */
  private createParticleField(): void {
    const container: HTMLElement =
      this.el.nativeElement.querySelector('.particles-container');
    const count = 80;
    for (let i = 0; i < count; i++) {
      const p = this.renderer.createElement('div');
      this.renderer.addClass(p, 'particle');
      // randomize properties
      const size = Math.random() * 4 + 1;
      p.style.width = `${size}px`;
      p.style.height = `${size}px`;
      p.style.left = `${Math.random() * 100}%`;
      p.style.top = `${Math.random() * 100}%`;
      p.style.animationDelay = `${Math.random() * 10}s`;
      p.style.opacity = `${Math.random() * 0.5 + 0.1}`;
      const hue = Math.floor(Math.random() * 40) + 200;
      p.style.backgroundColor = `hsl(${hue}, 100%, 70%)`;
      p.style.boxShadow = `0 0 ${size * 3}px hsl(${hue}, 100%, 70%)`;
      this.renderer.appendChild(container, p);
    }
  }

  /** “Escape” button when form is incomplete */
  private initButtonEscape(): void {
    const button: HTMLElement =
      this.el.nativeElement.querySelector('#sendButton');
    const name = this.el.nativeElement.querySelector('#nameInput');
    const email = this.el.nativeElement.querySelector('#emailInput');
    const msg = this.el.nativeElement.querySelector('#messageInput');

    const escape = () => {
      const x = Math.random() * 200 - 100;
      const y = Math.random() * 100 - 50;
      button.style.transform = `translate(${x}px, ${y}px)`;

      // shake the form card
      const formCard = this.el.nativeElement.querySelector('.form-card');
      formCard.classList.add('shake');
      setTimeout(() => formCard.classList.remove('shake'), 500);

      // highlight any empty fields
      if (!name.value.trim())  name.classList.add('empty');
      if (!email.value.trim()) email.classList.add('empty');
      if (!msg.value.trim())   msg.classList.add('empty');
    };

    button.addEventListener('mouseenter', () => {
      if (!name.value.trim() || !email.value.trim() || !msg.value.trim()) {
        escape();
      } else {
        button.style.transform = 'none';
      }
    });

    [name, email, msg].forEach((input: HTMLElement) => {
      input.addEventListener('input', () => {
        button.style.transform = 'none';
        input.classList.remove('empty');
      });
    });
  }
}

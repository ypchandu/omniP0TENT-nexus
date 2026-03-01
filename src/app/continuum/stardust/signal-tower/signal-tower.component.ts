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
  particles: any[] = [];
  particleCount = 40;
  particleSize = 5;
  particleSpeed = 2;
  connectionDistance = 100;
  mouseX = 0;
  mouseY = 0;
  animationFrameId: number | null = null;
  currentYear = new Date().getFullYear();

  userName: string = '';
  userEmail: string = '';
  userMessage: string = '';
  mailToLink: string = 'mailto:yp.chand9@gmail.com?subject=Contact from Portfolio';

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) { }

  ngAfterViewInit(): void {
    this.initFormInteractions();
    this.initButtonEscape();
    this.retryAutoplay(this.footerVid.nativeElement);
    this.initParticles();
    this.setupMouseTracking();
  }

  private initParticles(): void {
    const container = this.el.nativeElement.querySelector('.particles-container');
    if (!container) return;

    // Clear existing particles
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    // Create new particles
    for (let i = 0; i < this.particleCount; i++) {
      const particle = this.renderer.createElement('div');
      this.renderer.addClass(particle, 'particle');

      // Set initial position and properties
      const posX = Math.random() * container.clientWidth;
      const posY = Math.random() * container.clientHeight;
      const size = this.particleSize;

      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${posX}px`;
      particle.style.top = `${posY}px`;
      particle.style.backgroundColor = '#48b5e8';
      particle.style.borderRadius = '50%';
      particle.style.position = 'absolute';
      particle.style.zIndex = '1';

      // Store particle data
      this.particles.push({
        element: particle,
        x: posX,
        y: posY,
        vx: (Math.random() - 0.5) * this.particleSpeed,
        vy: (Math.random() - 0.5) * this.particleSpeed
      });

      this.renderer.appendChild(container, particle);
    }

    // Start animation loop
    this.animateParticles();
  }

  private setupMouseTracking(): void {
    const container = this.el.nativeElement.querySelector('.signal-contact-wrapper');
    if (!container) return;

    this.renderer.listen(container, 'mousemove', (event) => {
      this.mouseX = event.clientX;
      this.mouseY = event.clientY;
    });
  }

  private animateParticles(): void {
    const container = this.el.nativeElement.querySelector('.particles-container');
    if (!container) return;

    const update = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;

      this.particles.forEach((p, i) => {
        // Apply mouse repulsion
        const dx = p.x - this.mouseX;
        const dy = p.y - this.mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          const force = (150 - distance) / 50;
          p.vx += (dx / distance) * force;
          p.vy += (dy / distance) * force;
        }

        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off walls
        if (p.x < 0 || p.x > width) {
          p.vx *= -0.8;
          p.x = p.x < 0 ? 0 : width;
        }
        if (p.y < 0 || p.y > height) {
          p.vy *= -0.8;
          p.y = p.y < 0 ? 0 : height;
        }

        // Apply friction
        p.vx *= 0.98;
        p.vy *= 0.98;

        // Update element position
        p.element.style.left = `${p.x}px`;
        p.element.style.top = `${p.y}px`;
      });

      // Draw connections
      this.drawConnections();

      // Continue animation
      this.animationFrameId = requestAnimationFrame(update);
    };

    this.animationFrameId = requestAnimationFrame(update);
  }

  private drawConnections(): void {
    const container = this.el.nativeElement.querySelector('.particles-container');
    if (!container) return;

    // Clear existing connections
    const existingLines = container.querySelectorAll('.particle-line');
    existingLines.forEach((line: Element) => line.remove());

    // Draw new connections
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const p1 = this.particles[i];
        const p2 = this.particles[j];

        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.connectionDistance) {
          const line = this.renderer.createElement('div');
          this.renderer.addClass(line, 'particle-line');

          const angle = Math.atan2(dy, dx);
          const length = distance;

          line.style.width = `${length}px`;
          line.style.height = '1px';
          line.style.position = 'absolute';
          line.style.left = `${p1.x}px`;
          line.style.top = `${p1.y}px`;
          line.style.transform = `rotate(${angle}rad)`;
          line.style.transformOrigin = '0 0';
          line.style.backgroundColor = '#b548e8';
          line.style.opacity = `${1 - (distance / this.connectionDistance)}`;
          line.style.zIndex = '0';

          this.renderer.appendChild(container, line);
        }
      }
    }
  }
  ngOnDestroy(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
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
    const name = this.el.nativeElement.querySelector('#nameInput') as HTMLInputElement;
    const email = this.el.nativeElement.querySelector('#emailInput') as HTMLInputElement;
    const msg = this.el.nativeElement.querySelector('#messageInput') as HTMLTextAreaElement;

    const escape = () => {
      const x = Math.random() * 200 - 100;
      const y = Math.random() * 100 - 50;
      button.style.transform = `translate(${x}px, ${y}px)`;

      // shake the form card
      const formCard = this.el.nativeElement.querySelector('.form-card');
      formCard.classList.add('shake');
      setTimeout(() => formCard.classList.remove('shake'), 500);

      // highlight any empty fields (triggering reflow to restart animation)
      if (!name.value.trim()) {
        name.classList.remove('empty');
        void name.offsetWidth;
        name.classList.add('empty');
      }
      if (!email.value.trim()) {
        email.classList.remove('empty');
        void email.offsetWidth;
        email.classList.add('empty');
      }
      if (!msg.value.trim()) {
        msg.classList.remove('empty');
        void msg.offsetWidth;
        msg.classList.add('empty');
      }
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
        this.updateMailToLink(name.value.trim(), email.value.trim(), msg.value.trim());
      });
    });
  }

  private updateMailToLink(name: string, email: string, message: string): void {
    const subject = encodeURIComponent('Contact from Portfolio');
    const body = encodeURIComponent(`Hi Prem,\n\nI am reaching out to you from your portfolio.\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    this.mailToLink = `mailto:yp.chand9@gmail.com?subject=${subject}&body=${body}`;
  }

  triggerMailTo(): void {
    if (this.userName && this.userEmail && this.userMessage) {
      window.location.href = this.mailToLink;
    } else {
      // Fallback: force update if standard two-way binding isn't tightly linked
      window.location.href = this.mailToLink;
    }
  }
}

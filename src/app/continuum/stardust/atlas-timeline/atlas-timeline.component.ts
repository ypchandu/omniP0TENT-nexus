import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-atlas-timeline',
  templateUrl: './atlas-timeline.component.html',
  styleUrls: ['./atlas-timeline.component.css']
})
export class AtlasTimelineComponent implements AfterViewInit {
  showEducation = false;

  @ViewChild('expContainer', { static: true })
  exp!: ElementRef<HTMLElement>;

  @ViewChild('eduContainer', { static: true })
  edu!: ElementRef<HTMLElement>;

  constructor(private host: ElementRef<HTMLElement>) {}

  ngAfterViewInit() {
    this.observe(this.exp.nativeElement);
    this.observe(this.edu.nativeElement);
  }

  toggle(sec: 'experience' | 'education') {
    this.showEducation = sec === 'education';
    const ctr = sec === 'experience' ? this.exp.nativeElement : this.edu.nativeElement;
    this.animate(ctr);
  }

  private observe(el: HTMLElement) {
    const obs = new IntersectionObserver(e => {
      e.forEach(({ isIntersecting, target }) => {
        if (isIntersecting) {
          this.animate(target as HTMLElement);
          obs.unobserve(target);
        }
      });
    }, { threshold: 0.3 });
    obs.observe(el);
  }
  

  private animate(container: HTMLElement) {
    // 1) draw the line
    container.querySelector<HTMLElement>('.line')!.classList.add('drawn');

    // 2) wrap bullets and stagger letters
    let delay = 0;
    container.querySelectorAll<HTMLLIElement>('.points li').forEach(li => {
      const txt = li.textContent || '';
      li.textContent = '';
      for (const ch of txt) {
        const span = document.createElement('span');
        span.textContent = ch;
        span.style.animationDelay = `${delay.toFixed(2)}s`;
        li.appendChild(span);
        delay += 0.05;
      }
    });

    // 3) fade in icons after text
    container.querySelectorAll<HTMLElement>('.marker').forEach(icon => {
      icon.style.animationDelay = `${delay.toFixed(2)}s`;
      icon.classList.add('drawn');
    });
  }
}

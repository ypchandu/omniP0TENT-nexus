import { Component, HostListener, ViewChild, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true
})
export class NavbarComponent implements AfterViewInit {
  @ViewChild('progress', { static: true }) progress!: ElementRef<HTMLDivElement>;
  scrolled = false;
  menuOpen = false;

  constructor(private renderer: Renderer2) { }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  @HostListener('window:scroll', [])
  onScroll() {
    const winScroll = window.scrollY;
    this.scrolled = winScroll > 50;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrolledPercent = (winScroll / docHeight) * 100;
    this.renderer.setStyle(this.progress.nativeElement, 'width', scrolledPercent + '%');
  }

  ngAfterViewInit() {
    this.onScroll();
  }
}

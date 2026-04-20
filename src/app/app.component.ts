import { Component, OnInit }            from '@angular/core';
import { CommonModule }         from '@angular/common';
import { NavbarComponent }      from './continuum/navbar/navbar.component';
import { HeroVideoComponent }   from './continuum/hero-video/hero-video.component';
// Update the import path to a relative path if the file exists in the shared folder
import { SectionParticlesComponent } from './shared/section-particles/section-particles.component';

import { ChronoBioComponent }   from './continuum/stardust/chrono-bio/chrono-bio.component';
import { AtlasTimelineComponent }
                                 from './continuum/stardust/atlas-timeline/atlas-timeline.component';
import { ArtifactShowcaseComponent }
                                 from './continuum/stardust/artifact-showcase/artifact-showcase.component';
import { SignalTowerComponent }
                                 from './continuum/stardust/signal-tower/signal-tower.component';
import { GlyphTypeComponent }
                                 from './continuum/stardust/glyph-type/glyph-type.component';
import { environment } from '../environments/environment';

declare let gtag: Function;

@Component({
  selector: 'app-root',
  
  standalone: true,
  imports: [
    CommonModule,
          // remove if you no longer use ngx-scrollreveal
    NavbarComponent,
    HeroVideoComponent,
    ChronoBioComponent,
    AtlasTimelineComponent,
    ArtifactShowcaseComponent,
    SignalTowerComponent,
    SectionParticlesComponent

  ],
  templateUrl: './app.component.html',
  styleUrls:   ['./app.component.css']
})
export class AppComponent implements OnInit {
  title(title: any) {
    throw new Error('Method not implemented.');
  }

  ngOnInit() {
    this.initGoogleAnalytics();
  }

  private initGoogleAnalytics() {
    const gaId = environment.gaMeasurementId;
    if (!gaId) return;

    // Inject external GA script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(script);

    // Initialize config
    const tsScript = document.createElement('script');
    tsScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${gaId}');
    `;
    document.head.appendChild(tsScript);
  }
}

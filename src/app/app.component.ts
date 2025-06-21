import { Component }            from '@angular/core';
import { CommonModule }         from '@angular/common';
import { NavbarComponent }      from './continuum/navbar/navbar.component';
import { HeroVideoComponent }   from './continuum/hero-video/hero-video.component';
import { ChronoBioComponent }   from './continuum/stardust/chrono-bio/chrono-bio.component';
import { AtlasTimelineComponent }
                                 from './continuum/stardust/atlas-timeline/atlas-timeline.component';
import { ArtifactShowcaseComponent }
                                 from './continuum/stardust/artifact-showcase/artifact-showcase.component';
import { SignalTowerComponent }
                                 from './continuum/stardust/signal-tower/signal-tower.component';
import { GlyphTypeComponent }
                                 from './continuum/stardust/glyph-type/glyph-type.component';

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

  ],
  templateUrl: './app.component.html',
  styleUrls:   ['./app.component.css']
})
export class AppComponent {}

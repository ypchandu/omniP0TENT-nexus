import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionParticlesComponent } from './section-particles.component';

describe('SectionParticlesComponent', () => {
  let component: SectionParticlesComponent;
  let fixture: ComponentFixture<SectionParticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionParticlesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionParticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

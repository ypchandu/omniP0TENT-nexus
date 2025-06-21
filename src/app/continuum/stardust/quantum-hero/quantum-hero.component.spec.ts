import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantumHeroComponent } from './quantum-hero.component';

describe('QuantumHeroComponent', () => {
  let component: QuantumHeroComponent;
  let fixture: ComponentFixture<QuantumHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuantumHeroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuantumHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

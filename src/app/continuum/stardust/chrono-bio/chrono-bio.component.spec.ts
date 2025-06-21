import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChronoBioComponent } from './chrono-bio.component';

describe('ChronoBioComponent', () => {
  let component: ChronoBioComponent;
  let fixture: ComponentFixture<ChronoBioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChronoBioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChronoBioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

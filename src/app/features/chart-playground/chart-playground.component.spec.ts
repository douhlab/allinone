import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartPlaygroundComponent } from './chart-playground.component';

describe('ChartPlaygroundComponent', () => {
  let component: ChartPlaygroundComponent;
  let fixture: ComponentFixture<ChartPlaygroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartPlaygroundComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartPlaygroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HopperGameComponent } from './hopper-game.component';

describe('HopperGameComponent', () => {
  let component: HopperGameComponent;
  let fixture: ComponentFixture<HopperGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HopperGameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HopperGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

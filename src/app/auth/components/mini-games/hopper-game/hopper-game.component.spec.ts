import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HopperGameComponent} from './hopper-game.component';

describe('HopperGameComponent', () => {
  let component: HopperGameComponent;
  let fixture: ComponentFixture<HopperGameComponent>;

  beforeEach(async () => {
    localStorage.clear();

    await TestBed.configureTestingModule({
      declarations: [HopperGameComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HopperGameComponent);
    component = fixture.componentInstance;
    component.gameZone = {
      nativeElement: { offsetWidth: 420 }
    } as any;
  });

  afterEach(() => {
    if (component.loop) {
      clearInterval(component.loop);
    }
    localStorage.clear();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should start on medium level by default', () => {
    expect(component.currentLevel.label).toBe('Medium');
    expect(component.gapSize).toBe(100);
  });

  it('should apply easy level settings', () => {
    component.selectLevel(0);

    expect(component.currentLevel.label).toBe('Easy');
    expect(component.gapSize).toBe(130);
    expect(component.running).toBe(true);
  });

  it('should apply hard level settings', () => {
    component.running = false;
    component.selectLevel(2);

    expect(component.currentLevel.label).toBe('Hard');
    expect(component.gapSize).toBe(75);
    expect(component.currentLevel.gateSpeed).toBe(3);
  });

  it('should not change level while running', () => {
    component.running = true;
    component.selectLevel(0);

    expect(component.currentLevel.label).toBe('Medium');
  });

  it('should use level jump velocity', () => {
    component.running = true;
    component.jump();

    expect(component.velocity).toBe(-7);
  });

  it('should save best score per level', () => {
    component.running = false;
    component.score = 5;
    component.bestScore = 2;
    component['gameOver']();

    expect(localStorage.getItem('hopper-best-medium')).toBe('5');
    expect(component.bestScore).toBe(5);
  });

  it('should tilt bird based on velocity', () => {
    component.velocity = -7;
    expect(component.birdRotation).toBeLessThan(0);

    component.velocity = 10;
    expect(component.birdRotation).toBe(40);
  });
});

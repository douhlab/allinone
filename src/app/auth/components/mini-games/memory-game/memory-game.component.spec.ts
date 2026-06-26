import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MemoryGameComponent} from './memory-game.component';

describe('MemoryGameComponent', () => {
  let component: MemoryGameComponent;
  let fixture: ComponentFixture<MemoryGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MemoryGameComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemoryGameComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should start on medium level with a 6x6 board', () => {
    expect(component.currentLevel.label).toBe('Medium');
    expect(component.currentLevel.gridSize).toBe(6);
    expect(component.cards.length).toBe(36);
    expect(component.pairCount).toBe(18);
  });

  it('should rebuild board when level changes', () => {
    component.selectLevel(0);

    expect(component.currentLevel.label).toBe('Easy');
    expect(component.currentLevel.gridSize).toBe(4);
    expect(component.cards.length).toBe(16);
    expect(component.moves).toBe(0);
  });

  it('should build an 8x8 board on hard level', () => {
    component.selectLevel(2);

    expect(component.currentLevel.label).toBe('Hard');
    expect(component.cards.length).toBe(64);
    expect(component.pairCount).toBe(32);
  });

  it('should detect win when all pairs are matched', () => {
    component.matches = component.pairCount;
    expect(component.won).toBe(true);
  });

  it('should advance to next level', () => {
    component.currentLevelIndex = 0;
    component.nextLevel();

    expect(component.currentLevel.label).toBe('Medium');
    expect(component.cards.length).toBe(36);
  });

  it('should not advance beyond hard level', () => {
    component.currentLevelIndex = 2;
    component.nextLevel();

    expect(component.currentLevel.label).toBe('Hard');
  });

  it('should increment moves on second flip', () => {
    const [first, second] = component.cards;
    component.flip(first);
    component.flip(second);

    expect(component.moves).toBe(1);
  });
});

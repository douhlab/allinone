import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TypingChallengeComponent} from './typing-challenge.component';
import {TypingGameService, TypingSentences} from '../../../services/typing-game.service';
import {of} from 'rxjs';

describe('TypingChallengeComponent', () => {
  let component: TypingChallengeComponent;
  let fixture: ComponentFixture<TypingChallengeComponent>;

  const mockSentences: TypingSentences = {
    easy: ['Type fast.'],
    medium: ['Type this medium test.'],
    hard: ['Type this much longer hard mode test sentence.']
  };

  const mockService = {
    loadSentences: () => of(mockSentences),
    calculateWpm: (correct: number, seconds: number) =>
      seconds === 0 ? 0 : Math.round((correct / 5) / (seconds / 60)),
    calculateAccuracy: (correct: number, typed: number) =>
      typed === 0 ? 100 : Math.round((correct / typed) * 100),
    getBestScore: jest.fn().mockReturnValue(42),
    saveBestScore: jest.fn()
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    await TestBed.configureTestingModule({
      declarations: [TypingChallengeComponent],
      providers: [{ provide: TypingGameService, useValue: mockService }]
    }).compileComponents();

    fixture = TestBed.createComponent(TypingChallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start on medium level with medium sentence pool', () => {
    expect(component.currentLevel.label).toBe('Medium');
    expect(component.timer).toBe(38);
    expect(mockSentences.medium).toContain(component.sentence);
  });

  it('should switch to easy level with longer timer', () => {
    component.selectLevel(0);

    expect(component.currentLevel.label).toBe('Easy');
    expect(component.timer).toBe(50);
    expect(mockSentences.easy).toContain(component.sentence);
    expect(mockService.getBestScore).toHaveBeenCalledWith('easy');
  });

  it('should not switch level while playing', () => {
    component.sentence = 'abc';
    component.handleKeyDown(new KeyboardEvent('keydown', { key: 'a' }));
    component.selectLevel(0);

    expect(component.currentLevel.label).toBe('Medium');
  });

  it('should start timer and track typing', () => {
    component.sentence = 'ab';
    component.handleKeyDown(new KeyboardEvent('keydown', { key: 'a' }));
    component.handleKeyDown(new KeyboardEvent('keydown', { key: 'b' }));

    expect(component.started).toBe(true);
    expect(component.currentIndex).toBe(2);
    expect(component.finished).toBe(true);
  });

  it('should save score for current level on finish', () => {
    component.sentence = 'a';
    component.handleKeyDown(new KeyboardEvent('keydown', { key: 'a' }));

    expect(mockService.saveBestScore).toHaveBeenCalledWith('medium', expect.any(Number));
  });

  it('should recalculate stats on backspace', () => {
    component.sentence = 'abc';
    component.handleKeyDown(new KeyboardEvent('keydown', { key: 'a' }));
    component.handleKeyDown(new KeyboardEvent('keydown', { key: 'x' }));
    component.handleKeyDown(new KeyboardEvent('keydown', { key: 'Backspace' }));

    expect(component.currentIndex).toBe(1);
    expect(component.mistakes).toBe(0);
    expect(component.correctCharacters).toBe(1);
  });
});

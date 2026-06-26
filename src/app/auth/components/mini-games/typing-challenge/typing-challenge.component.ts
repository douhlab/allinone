import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import {TypingGameService, TypingSentences} from '../../../services/typing-game.service';

interface TypingLevel {
  id: string;
  label: string;
  timerSeconds: number;
}

@Component({
  selector: 'app-typing-challenge',
  templateUrl: './typing-challenge.component.html',
  styleUrls: ['./typing-challenge.component.scss']
})
export class TypingChallengeComponent implements OnInit, AfterViewInit, OnDestroy {
  readonly levels: TypingLevel[] = [
    { id: 'easy', label: 'Easy', timerSeconds: 50 },
    { id: 'medium', label: 'Medium', timerSeconds: 38 },
    { id: 'hard', label: 'Hard', timerSeconds: 28 }
  ];

  @ViewChild('gamePanel')
  gamePanel?: ElementRef<HTMLElement>;

  sentence = '';
  typedText = '';
  currentIndex = 0;
  mistakes = 0;
  correctCharacters = 0;
  timer = 30;
  started = false;
  finished = false;
  wpm = 0;
  accuracy = 100;
  progress = 0;
  bestScore = 0;
  currentLevelIndex = 1;

  private sentenceBank: TypingSentences = { easy: [], medium: [], hard: [] };
  private interval?: ReturnType<typeof setInterval>;
  private elapsedSeconds = 0;

  constructor(private gameService: TypingGameService) {}

  get currentLevel(): TypingLevel {
    return this.levels[this.currentLevelIndex];
  }

  get isPlaying(): boolean {
    return this.started && !this.finished;
  }

  ngOnInit(): void {
    this.loadBestScore();

    this.gameService.loadSentences().subscribe(sentences => {
      this.sentenceBank = sentences;
      this.startNewGame();
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.focusPanel());
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }

  selectLevel(index: number): void {
    if (index === this.currentLevelIndex || this.isPlaying) {
      return;
    }

    this.currentLevelIndex = index;
    this.loadBestScore();
    this.startNewGame();
  }

  startNewGame(): void {
    this.resetState();
    this.sentence = this.getRandomSentence();
    setTimeout(() => this.focusPanel());
  }

  focusPanel(): void {
    this.gamePanel?.nativeElement.focus();
  }

  handleKeyDown(event: KeyboardEvent): void {
    if (this.finished || !this.sentence) {
      return;
    }

    if (event.ctrlKey || event.metaKey || event.altKey) {
      return;
    }

    if (!this.started) {
      this.started = true;
      this.startTimer();
    }

    if (event.key === 'Backspace') {
      event.preventDefault();

      if (this.currentIndex > 0) {
        this.currentIndex--;
        this.typedText = this.typedText.slice(0, -1);
        this.recalculateStats();
        this.updateProgress();
      }

      return;
    }

    if (event.key === 'Enter' && this.finished) {
      event.preventDefault();
      this.restart();
      return;
    }

    if (event.key.length !== 1) {
      return;
    }

    event.preventDefault();

    const expectedChar = this.sentence[this.currentIndex];
    this.typedText += event.key;

    if (event.key === expectedChar) {
      this.correctCharacters++;
    } else {
      this.mistakes++;
    }

    this.currentIndex++;
    this.updateProgress();
    this.updateStats();

    if (this.currentIndex >= this.sentence.length) {
      this.endGame();
    }
  }

  restart(): void {
    this.clearTimer();
    this.startNewGame();
  }

  getCharClass(index: number): string {
    if (index < this.currentIndex) {
      return this.typedText[index] === this.sentence[index] ? 'correct' : 'wrong';
    }

    if (index === this.currentIndex) {
      return 'current';
    }

    return 'pending';
  }

  private loadBestScore(): void {
    this.bestScore = this.gameService.getBestScore(this.currentLevel.id);
  }

  private resetState(): void {
    this.clearTimer();
    this.typedText = '';
    this.currentIndex = 0;
    this.mistakes = 0;
    this.correctCharacters = 0;
    this.timer = this.currentLevel.timerSeconds;
    this.elapsedSeconds = 0;
    this.started = false;
    this.finished = false;
    this.wpm = 0;
    this.accuracy = 100;
    this.progress = 0;
  }

  private getRandomSentence(): string {
    const pool = this.sentenceBank[this.currentLevel.id as keyof TypingSentences];

    if (!pool?.length) {
      return '';
    }

    return pool[Math.floor(Math.random() * pool.length)];
  }

  private startTimer(): void {
    this.clearTimer();

    this.interval = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
        this.elapsedSeconds++;
        this.updateStats();
      } else {
        this.endGame();
      }
    }, 1000);
  }

  private clearTimer(): void {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = undefined;
    }
  }

  private recalculateStats(): void {
    let correct = 0;
    let mistakes = 0;

    for (let i = 0; i < this.currentIndex; i++) {
      if (this.typedText[i] === this.sentence[i]) {
        correct++;
      } else {
        mistakes++;
      }
    }

    this.correctCharacters = correct;
    this.mistakes = mistakes;
    this.updateStats();
  }

  private updateProgress(): void {
    if (!this.sentence.length) {
      this.progress = 0;
      return;
    }

    this.progress = Math.round((this.currentIndex / this.sentence.length) * 100);
  }

  private updateStats(): void {
    const seconds = this.started
      ? Math.max(this.elapsedSeconds, this.currentLevel.timerSeconds - this.timer)
      : 0;

    this.wpm = this.gameService.calculateWpm(this.correctCharacters, seconds);
    this.accuracy = this.gameService.calculateAccuracy(
      this.correctCharacters,
      this.correctCharacters + this.mistakes
    );
  }

  private endGame(): void {
    if (this.finished) {
      return;
    }

    this.finished = true;
    this.clearTimer();
    this.updateStats();
    this.gameService.saveBestScore(this.currentLevel.id, this.wpm);
    this.loadBestScore();
  }
}

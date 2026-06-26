import {Component, OnInit} from '@angular/core';

interface Card {
  id: number;
  icon: string;
  flipped: boolean;
  matched: boolean;
}

interface MemoryLevel {
  id: string;
  label: string;
  gridSize: number;
  flipDelayMs: number;
}

@Component({
  selector: 'app-memory-game',
  templateUrl: './memory-game.component.html',
  styleUrl: './memory-game.component.scss'
})
export class MemoryGameComponent implements OnInit {
  readonly levels: MemoryLevel[] = [
    { id: 'easy', label: 'Easy', gridSize: 4, flipDelayMs: 1000 },
    { id: 'medium', label: 'Medium', gridSize: 6, flipDelayMs: 800 },
    { id: 'hard', label: 'Hard', gridSize: 8, flipDelayMs: 500 }
  ];

  private readonly iconPool = [
    '🧪', '⚙️', '💾', '🔒', '📊', '☕', '🧬', '🔬',
    '🖥️', '📡', '🧫', '🔋', '📎', '🗂️', '📝', '🔑',
    '🌡️', '🧲', '💡', '🛠️', '📐', '🎯', '🔍', '🧯',
    '📌', '🗃️', '💿', '🖱️', '⌨️', '🖨️', '🔌', '📀'
  ];

  cards: Card[] = [];
  lockBoard = false;
  moves = 0;
  matches = 0;
  currentLevelIndex = 1;

  private firstCard?: Card;
  private secondCard?: Card;
  private flipTimeout?: ReturnType<typeof setTimeout>;

  get currentLevel(): MemoryLevel {
    return this.levels[this.currentLevelIndex];
  }

  get boardColumns(): number {
    return this.currentLevel.gridSize;
  }

  get pairCount(): number {
    return (this.currentLevel.gridSize * this.currentLevel.gridSize) / 2;
  }

  get won(): boolean {
    return this.matches === this.pairCount && this.pairCount > 0;
  }

  get hasNextLevel(): boolean {
    return this.currentLevelIndex < this.levels.length - 1;
  }

  ngOnInit(): void {
    this.resetGame();
  }

  selectLevel(index: number): void {
    if (index === this.currentLevelIndex || this.lockBoard) {
      return;
    }
    this.currentLevelIndex = index;
    this.resetGame();
  }

  nextLevel(): void {
    if (!this.hasNextLevel) {
      return;
    }
    this.currentLevelIndex++;
    this.resetGame();
  }

  resetGame(): void {
    if (this.flipTimeout) {
      clearTimeout(this.flipTimeout);
      this.flipTimeout = undefined;
    }

    const icons = this.iconPool.slice(0, this.pairCount);
    const duplicated = [...icons, ...icons];

    this.cards = duplicated
      .sort(() => Math.random() - 0.5)
      .map((icon, index) => ({
        id: index,
        icon,
        flipped: false,
        matched: false
      }));

    this.moves = 0;
    this.matches = 0;
    this.firstCard = undefined;
    this.secondCard = undefined;
    this.lockBoard = false;
  }

  flip(card: Card): void {
    if (this.lockBoard || this.won) {
      return;
    }

    if (card.flipped || card.matched) {
      return;
    }

    card.flipped = true;

    if (!this.firstCard) {
      this.firstCard = card;
      return;
    }

    this.secondCard = card;
    this.moves++;
    this.checkMatch();
  }

  private checkMatch(): void {
    if (!this.firstCard || !this.secondCard) {
      return;
    }

    const matched = this.firstCard.icon === this.secondCard.icon;

    if (matched) {
      this.firstCard.matched = true;
      this.secondCard.matched = true;
      this.matches++;
      this.clearSelection();
      return;
    }

    this.lockBoard = true;

    this.flipTimeout = setTimeout(() => {
      if (this.firstCard) {
        this.firstCard.flipped = false;
      }

      if (this.secondCard) {
        this.secondCard.flipped = false;
      }

      this.clearSelection();
      this.lockBoard = false;
      this.flipTimeout = undefined;
    }, this.currentLevel.flipDelayMs);
  }

  private clearSelection(): void {
    this.firstCard = undefined;
    this.secondCard = undefined;
  }
}

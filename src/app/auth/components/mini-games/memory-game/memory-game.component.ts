import {Component} from '@angular/core';

interface Card {
  id: number;
  icon: string;
  flipped: boolean;
  matched: boolean;
}

@Component({
  selector: 'app-memory-game',
  templateUrl: './memory-game.component.html',
  styleUrl: './memory-game.component.scss'
})
export class MemoryGameComponent {
  cards: Card[] = [];
  lockBoard = false;
  moves = 0;
  matches = 0;
  private firstCard?: Card;
  private secondCard?: Card;
  private icons = [
    '🧪',
    '⚙️',
    '💾',
    '🔒',
    '📊',
    '☕'
  ];

  get won(): boolean {
    return this.matches === this.icons.length;
  }

  ngOnInit(): void {
    this.resetGame();
  }

  resetGame(): void {

    const duplicated = [...this.icons, ...this.icons];

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

    if (this.lockBoard) return;

    if (card.flipped || card.matched) return;

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

    if (!this.firstCard || !this.secondCard) return;

    const matched =
      this.firstCard.icon === this.secondCard.icon;

    if (matched) {

      this.firstCard.matched = true;
      this.secondCard.matched = true;

      this.matches++;

      this.clearSelection();

      return;
    }

    this.lockBoard = true;

    setTimeout(() => {

      if (this.firstCard) {
        this.firstCard.flipped = false;
      }

      if (this.secondCard) {
        this.secondCard.flipped = false;
      }

      this.clearSelection();

      this.lockBoard = false;

    }, 800);
  }

  private clearSelection(): void {
    this.firstCard = undefined;
    this.secondCard = undefined;
  }
}

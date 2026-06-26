import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  AfterViewInit,
  NgZone
} from '@angular/core';

interface Gate {
  x: number;
  gapY: number;
  passed: boolean;
}

interface HopperLevel {
  id: string;
  label: string;
  gravity: number;
  jumpVelocity: number;
  gateSpeed: number;
  gapSize: number;
  gateSpacing: number;
}

@Component({
  selector: 'app-hopper-game',
  templateUrl: './hopper-game.component.html',
  styleUrls: ['./hopper-game.component.scss']
})
export class HopperGameComponent implements OnInit, OnDestroy, AfterViewInit {
  readonly levels: HopperLevel[] = [
    {
      id: 'easy',
      label: 'Easy',
      gravity: 0.35,
      jumpVelocity: -6.5,
      gateSpeed: 1.5,
      gapSize: 130,
      gateSpacing: 260
    },
    {
      id: 'medium',
      label: 'Medium',
      gravity: 0.45,
      jumpVelocity: -7,
      gateSpeed: 2,
      gapSize: 100,
      gateSpacing: 220
    },
    {
      id: 'hard',
      label: 'Hard',
      gravity: 0.55,
      jumpVelocity: -7.5,
      gateSpeed: 3,
      gapSize: 75,
      gateSpacing: 180
    }
  ];

  @ViewChild('gameZone')
  gameZone?: ElementRef;

  birdY = 120;
  velocity = 0;
  score = 0;
  bestScore = 0;
  running = false;
  currentLevelIndex = 1;

  loop?: number;
  gates: Gate[] = [];

  gameHeight = 340;
  gameWidth = 0;

  readonly BIRD_X = 60;
  readonly BIRD_SIZE = 28;
  readonly GATE_WIDTH = 40;

  constructor(private ngZone: NgZone) {}

  get currentLevel(): HopperLevel {
    return this.levels[this.currentLevelIndex];
  }

  get gapSize(): number {
    return this.currentLevel.gapSize;
  }

  get birdRotation(): number {
    return Math.min(Math.max(this.velocity * 4, -20), 55);
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.loadBestScore();
    this.gameWidth = this.gameZone?.nativeElement.offsetWidth || 420;
    this.start();
  }

  ngOnDestroy(): void {
    if (this.loop) {
      clearInterval(this.loop);
    }
  }

  selectLevel(index: number): void {
    if (index === this.currentLevelIndex || this.running) {
      return;
    }

    this.currentLevelIndex = index;
    this.loadBestScore();
    this.start();
  }

  start(): void {
    this.gameWidth = this.gameZone?.nativeElement.offsetWidth || 520;

    if (this.loop) {
      clearInterval(this.loop);
    }

    this.running = true;
    this.score = 0;
    this.birdY = 120;
    this.velocity = 0;
    this.gates = [];
    this.spawnGate();

    this.ngZone.runOutsideAngular(() => {
      this.loop = window.setInterval(() => {
        this.ngZone.run(() => this.tick());
      }, 16);
    });
  }

  jump(): void {
    if (!this.running) {
      this.start();
      return;
    }

    this.velocity = this.currentLevel.jumpVelocity;
  }

  tick(): void {
    this.updateBird();
    this.updateGates();
    this.checkCollision();
  }

  private updateBird(): void {
    this.velocity += this.currentLevel.gravity;
    this.birdY += this.velocity;

    if (this.birdY <= 0 || this.birdY >= this.gameHeight - this.BIRD_SIZE) {
      this.gameOver();
    }
  }

  private updateGates(): void {
    const speed = this.currentLevel.gateSpeed;

    this.gates.forEach(g => {
      g.x -= speed;

      if (!g.passed && g.x + this.GATE_WIDTH < this.BIRD_X) {
        g.passed = true;
        this.score++;
      }
    });

    this.gates = this.gates.filter(g => g.x > -60);

    const last = this.gates[this.gates.length - 1];

    if (!last || last.x < this.currentLevel.gateSpacing) {
      this.spawnGate();
    }
  }

  private spawnGate(): void {
    const minPipe = 40;
    const maxGapY = this.gameHeight - this.gapSize - minPipe - this.BIRD_SIZE;
    const gapY = minPipe + Math.random() * Math.max(maxGapY - minPipe, 0);

    this.gates.push({
      x: this.gameWidth,
      gapY,
      passed: false
    });
  }

  private checkCollision(): void {
    for (const gate of this.gates) {
      const hitX =
        this.BIRD_X + this.BIRD_SIZE > gate.x &&
        this.BIRD_X < gate.x + this.GATE_WIDTH;

      if (!hitX) {
        continue;
      }

      const inGap =
        this.birdY > gate.gapY &&
        this.birdY < gate.gapY + this.gapSize;

      if (!inGap) {
        this.gameOver();
        return;
      }
    }
  }

  private gameOver(): void {
    this.running = false;

    if (this.loop) {
      clearInterval(this.loop);
    }

    if (this.score > this.bestScore) {
      this.bestScore = this.score;
      localStorage.setItem(this.getBestKey(), String(this.bestScore));
    }
  }

  private loadBestScore(): void {
    this.bestScore = Number(localStorage.getItem(this.getBestKey()) || 0);
  }

  private getBestKey(): string {
    return `hopper-best-${this.currentLevel.id}`;
  }
}

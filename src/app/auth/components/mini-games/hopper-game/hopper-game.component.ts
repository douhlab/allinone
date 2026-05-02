import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild, AfterViewInit, NgZone
} from '@angular/core';

interface Gate {
  x: number;
  gapY: number;
  passed: boolean;
}

@Component({
  selector: 'app-hopper-game',
  templateUrl: './hopper-game.component.html',
  styleUrls: ['./hopper-game.component.scss']
})
export class HopperGameComponent
  implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('gameZone')
  gameZone?: ElementRef;

  birdY = 120;
  velocity = 0;
  gravity = 0.45;

  score = 0;
  bestScore = 0;

  running = false;

  loop?: number;

  gates: Gate[] = [];

  gameHeight = 340;
  gameWidth = 0;

  readonly BIRD_X = 60;
  readonly BIRD_SIZE = 28;

  readonly GATE_WIDTH = 40;
  readonly GAP_SIZE = 100;

  constructor(private ngZone: NgZone) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.bestScore = Number(
      localStorage.getItem('hopper-best') || 0
    );

    this.gameWidth =
      this.gameZone?.nativeElement.offsetWidth || 420;

    this.start();
  }

  ngOnDestroy(): void {

    if (this.loop) {
      clearInterval(this.loop);
    }
  }

  start(): void {

    this.gameWidth =
      this.gameZone?.nativeElement.offsetWidth || 520;

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

    this.velocity = -7;
  }

  tick(): void {

    this.updateBird();

    this.updateGates();

    this.checkCollision();
  }

  private updateBird(): void {

    this.velocity += this.gravity;

    this.birdY += this.velocity;

    // FIXED BOUNDS
    if (
      this.birdY <= 0 ||
      this.birdY >=
      this.gameHeight - this.BIRD_SIZE
    ) {
      this.gameOver();
    }
  }

  private updateGates(): void {

    this.gates.forEach(g => {

      g.x -= 2;

      if (!g.passed && (g.x + this.GATE_WIDTH) < this.BIRD_X) {
        console.log('score', this.score);
        g.passed = true;
        this.score++;
      }

    });

    this.gates =
      this.gates.filter(
        g => g.x > -60
      );

    const last =
      this.gates[
      this.gates.length - 1
        ];

    if (!last || last.x < 220) {
      this.spawnGate();
    }
  }

  private spawnGate(): void {

    const gapY =
      40 + Math.random() * 140;

    this.gates.push({
      x: this.gameWidth,
      gapY,
      passed: false
    });
  }

  private checkCollision(): void {

    for (const gate of this.gates) {

      const hitX =
        this.BIRD_X + this.BIRD_SIZE >
        gate.x &&
        this.BIRD_X <
        gate.x + this.GATE_WIDTH;

      if (!hitX) continue;

      const inGap =
        this.birdY > gate.gapY &&
        this.birdY <
        gate.gapY + this.GAP_SIZE;

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

    // BEST SCORE
    if (this.score > this.bestScore) {

      this.bestScore = this.score;

      localStorage.setItem(
        'hopper-best',
        String(this.bestScore)
      );
    }
  }

}

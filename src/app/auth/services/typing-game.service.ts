import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

export interface TypingSentences {
  easy: string[];
  medium: string[];
  hard: string[];
}

@Injectable({
  providedIn: 'root'
})
export class TypingGameService {
  private readonly sentencesUrl = 'assets/data/sentences.json';

  constructor(private http: HttpClient) {}

  loadSentences(): Observable<TypingSentences> {
    return this.http.get<TypingSentences | string[]>(this.sentencesUrl).pipe(
      map(data => this.normalizeSentences(data)),
      catchError(() => of(this.getFallbackSentences()))
    );
  }

  calculateAccuracy(correct: number, typed: number): number {
    if (typed === 0) {
      return 100;
    }
    return Math.round((correct / typed) * 100);
  }

  calculateWpm(correctCharacters: number, seconds: number): number {
    if (seconds <= 0) {
      return 0;
    }
    const minutes = seconds / 60;
    return Math.round((correctCharacters / 5) / minutes);
  }

  getBestScore(levelId: string): number {
    return Number(localStorage.getItem(this.getBestKey(levelId)) ?? 0);
  }

  saveBestScore(levelId: string, score: number): void {
    const best = this.getBestScore(levelId);
    if (score > best) {
      localStorage.setItem(this.getBestKey(levelId), score.toString());
    }
  }

  private getBestKey(levelId: string): string {
    return `typing-best-${levelId}`;
  }

  private normalizeSentences(data: TypingSentences | string[]): TypingSentences {
    if (Array.isArray(data)) {
      return {
        easy: data.filter(s => s.length <= 30),
        medium: data.filter(s => s.length > 30 && s.length <= 65),
        hard: data.filter(s => s.length > 65)
      };
    }

    return {
      easy: data.easy?.length ? data.easy : this.getFallbackSentences().easy,
      medium: data.medium?.length ? data.medium : this.getFallbackSentences().medium,
      hard: data.hard?.length ? data.hard : this.getFallbackSentences().hard
    };
  }

  private getFallbackSentences(): TypingSentences {
    return {
      easy: ['Spring Boot makes Java development enjoyable.'],
      medium: [
        'Implement JWT authentication with refresh tokens and role-based access control.'
      ],
      hard: [
        'Microservices communicate through REST APIs, message queues, and gRPC endpoints across regions.'
      ]
    };
  }
}

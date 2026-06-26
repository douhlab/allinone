import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TypingGameService} from './typing-game.service';

describe('TypingGameService', () => {
  let service: TypingGameService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TypingGameService]
    });

    service = TestBed.inject(TypingGameService);
    httpMock = TestBed.inject(HttpTestingController);
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load tiered sentences from assets', () => {
    const payload = {
      easy: ['Hi there.'],
      medium: ['Medium sentence here.'],
      hard: ['A much longer and more difficult sentence for hard mode practice.']
    };

    service.loadSentences().subscribe(result => {
      expect(result).toEqual(payload);
    });

    const req = httpMock.expectOne('assets/data/sentences.json');
    expect(req.request.method).toBe('GET');
    req.flush(payload);
  });

  it('should calculate wpm and accuracy', () => {
    expect(service.calculateWpm(50, 30)).toBe(20);
    expect(service.calculateAccuracy(8, 10)).toBe(80);
    expect(service.calculateAccuracy(0, 0)).toBe(100);
  });

  it('should save best score per level', () => {
    service.saveBestScore('easy', 25);
    service.saveBestScore('easy', 20);
    service.saveBestScore('hard', 40);

    expect(service.getBestScore('easy')).toBe(25);
    expect(service.getBestScore('hard')).toBe(40);
    expect(service.getBestScore('medium')).toBe(0);
  });
});

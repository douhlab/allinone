import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {NewsService} from './news.service';

describe('NewsService', () => {
  let service: NewsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NewsService]
    });

    service = TestBed.inject(NewsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch top headlines for a category', () => {
    const articles = { articles: [{ title: 'Headline' }] };

    service.getTopHeadlines('technology').subscribe(res => {
      expect(res).toEqual(articles);
    });

    const req = httpMock.expectOne(
      r => r.url === 'https://newsapi.org/v2/top-headlines'
    );
    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('category')).toBe('technology');
    expect(req.request.params.get('country')).toBe('us');
    expect(req.request.params.get('pageSize')).toBe('6');
    req.flush(articles);
  });
});

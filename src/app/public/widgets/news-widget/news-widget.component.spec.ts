import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NewsWidgetComponent} from './news-widget.component';
import {of} from "rxjs";
import {NewsService} from "../../service/news.service";

describe('NewsWidgetComponent', () => {
  let component: NewsWidgetComponent;
  let fixture: ComponentFixture<NewsWidgetComponent>;

  let newsServiceMock: any;

  beforeEach(async () => {
    newsServiceMock = {
      getTopHeadlines: jest.fn().mockReturnValue(of([]))
    };
    await TestBed.configureTestingModule({
      declarations: [NewsWidgetComponent],
      providers: [
        {provide: NewsService, useValue: newsServiceMock}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NewsWidgetComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

});

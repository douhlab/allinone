import {Component, OnInit} from '@angular/core';
import {NewsService} from "../../service/news.service";

@Component({
  selector: 'app-news-widget',
  templateUrl: './news-widget.component.html',
  styleUrl: './news-widget.component.scss'
})
export class NewsWidgetComponent implements OnInit {
  articles: any[] = [];
  loading = true;
  categories = ['general', 'business', 'technology', 'sports'];

  selectedCategory = 'general';

  constructor(private newsService: NewsService) {
  }

  ngOnInit() {
    this.loadNews(this.selectedCategory);
  }

  loadNews(category: string) {
    this.loading = true;
    this.selectedCategory = category;

    this.newsService.getTopHeadlines(category)
      .subscribe(res => {
        this.articles = res.articles;
        this.loading = false;
      });
  }
}

import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class NewsService {

  private apiKey = 'ff4edcd24ded4a13b9371c1c7d76c9fd';

  constructor(private http: HttpClient) {
  }

  getTopHeadlines(category: string) {

    return this.http.get<any>(
      'https://newsapi.org/v2/top-headlines',
      {
        params: {
          country: 'us',
          category: category,
          pageSize: '6',
          apiKey: this.apiKey
        }
      }
    );
  }
}

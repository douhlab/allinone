import {Component, OnInit} from '@angular/core';
import {MarketService} from "../../service/market.service";
import {forkJoin, interval} from "rxjs";

interface MarketItem {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  marketCap: number;
}

@Component({
  selector: 'app-market-widget',
  templateUrl: './market-widget.component.html',
  styleUrl: './market-widget.component.scss'
})
export class MarketWidgetComponent implements OnInit {
  loading: Boolean = true;

  items: MarketItem[] = [];
  symbols = ['GOOG', 'AAPL', 'MSFT', 'AMZN', 'TSLA', 'NVDA', 'DDOG', "NET"];

  constructor(private marketService: MarketService) {
  }

  ngOnInit() {
    this.load();
    interval(60000).subscribe(() => this.load());
  }

  formatCap(value: number): string {
    if (value > 1000) {
      return (value / 1000).toFixed(1) + 'B';
    }
    return value.toFixed(0) + 'M';
  }

  private load(): void {
    this.loading = true;
    forkJoin(
      this.symbols.map(symbol =>
        this.marketService.getFinnStock(symbol)
      )
    ).subscribe(responses => {
      this.items = responses.map((r, i) => {
        return {
          symbol: this.symbols[i],
          price: r.quote.c,
          change: r.quote.d,
          changePercent: r.quote.dp,
          marketCap: r.profile.marketCapitalization
        }
      })
      this.loading = false;
    });
  }
}



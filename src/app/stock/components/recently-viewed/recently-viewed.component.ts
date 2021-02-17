import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { StockService } from '../../../shared/services/stock-service/stock.service';

@Component({
  selector: 'app-recently-viewed',
  templateUrl: './recently-viewed.component.html',
  styleUrls: ['./recently-viewed.component.scss']
})
export class RecentlyViewedComponent implements OnInit, OnDestroy, OnChanges {
  @Input() symbol: string = null;

  public recentlyViewed: any[] = [];
  public recentlyViewedData: any[] = [];
  clockInterval: NodeJS.Timeout;

  constructor(private stock: StockService) { }

  ngOnChanges(changes: SimpleChanges) {
    this.setRecentlyViewed(this.symbol);
  }

  ngOnDestroy(): void {
    clearInterval(this.clockInterval);
  }

  ngOnInit(): void {
    this.setRecentlyViewed(this.symbol);
  }

  setRecentlyViewed(symbol: string = null) {
    if (localStorage.getItem("recently_viewed")) {
      this.recentlyViewed = JSON.parse(localStorage.getItem("recently_viewed"))
      this.recentlyViewed.forEach(view => {
        view.link = `/stock/${view.symbol}`
      });

      let current = JSON.parse(localStorage.getItem("recently_viewed"))
      let currentKeys = current.map(view => view['symbol']);
      if (symbol && !currentKeys.includes(symbol))
      {
        current.push({
          symbol: symbol,
          date: new Date(),
          link: `/stock/${symbol}`
        });

        localStorage.setItem("recently_viewed", JSON.stringify(current));
        this.recentlyViewed = current.map(view => view.symbol);
      }
    }
    else {
      if (symbol)
      {
        localStorage.setItem("recently_viewed", JSON.stringify([{
          symbol: symbol,
          date: new Date(),
          link: `/stock/${symbol}`
        }]));
      }
    }

    this.recentlyViewed = JSON.parse(localStorage.getItem("recently_viewed")).map(view => view.symbol);
  }

}

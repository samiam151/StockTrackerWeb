import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { StockService } from '../../services/stock-service/stock.service';

@Component({
  selector: 'app-stock-table',
  templateUrl: './stock-table.component.html',
  styleUrls: ['./stock-table.component.scss']
})
export class StockTableComponent implements OnInit, OnChanges, OnDestroy {
  public clockInterval: NodeJS.Timeout;

  constructor(private stock: StockService) { }

  ngOnChanges(changes: SimpleChanges): void {
    clearInterval(this.clockInterval);
    this.formatData(this.symbols);
  }

  ngOnDestroy(): void {
    clearInterval(this.clockInterval);
  }

  @Input() title: string;
  @Input() symbols: string[];
  @Input() interval: number = 5000;

  public data: any[] = null;

  ngOnInit(): void {
    this.formatData(this.symbols);
  }

  formatData(symbols: string[]) {
    clearInterval(this.clockInterval);
    this.clockInterval = setInterval(() => {
      this.stock.getBatchData(symbols).subscribe(data => {
        this.data = Object.keys(data).map(symbol => {
          let stock = data[symbol]['quote'];
          return {
            link: `/stock/${stock.symbol}`,
            symbol: stock.symbol,
            latestPrice: stock.latestPrice,
            change: stock.change,
            changePercent: stock.changePercent,
            style: stock.change > 0 ? "table-success" : "table-danger"
          }
        });

        console.log(this.data);
      })
    }, this.interval);
  }

}

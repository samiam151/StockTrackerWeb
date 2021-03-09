import { Component, Injector, OnInit } from '@angular/core';
import { StockService } from "../../shared/services/stock-service/stock.service";
import { StockPageBaseComponent } from '../../shared/components/stock-page-base/stock-page-base.component';
import { StockQueryService } from "../../shared/services/stock-query.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [StockService]
})
export class HomeComponent implements OnInit {
  public symbols: string[] = ['GME', 'BB', 'TSLA', 'AAPL'];
  public types: string[] = ['chart', 'quote'];

  public query_results = null;
  data: any;
  lineChartData: any[];

  constructor(private sqs: StockQueryService) {
  }

  ngOnInit(): void {
    this.sqs.register([
      {
        name: "home",
        symbols: this.symbols,
        types: ['chart']
      }
    ]).subscribe(data => {
      this.data = data;

      let lineChartData = Object.keys(data).reduce((arr, symbol) => {
        if (this.symbols.includes(symbol)) {
          let d = data[symbol]['chart'];
          arr.push({
            symbol: symbol,
            data: d
          })
        }
        return arr;
      }, [])
      this.lineChartData = lineChartData;
    });
  }

}

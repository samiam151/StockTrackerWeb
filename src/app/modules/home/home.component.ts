import { Component, OnInit } from '@angular/core';
import { StockService } from "../../shared/services/stock-service/stock.service";
import { StockPageBaseComponent } from '../../shared/components/stock-page-base/stock-page-base.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [StockService]
})
export class HomeComponent extends StockPageBaseComponent implements OnInit {
  public symbols: string[] = ['GME', 'BB', 'TSLA', 'AAPL'];
  public types: string[] = ['chart', 'quote'];

  public query_results = null;
  data: any;
  lineChartData: any[];

  ngOnInit(): void {
    super.ngOnInit();
    this.query_results$.subscribe(data => {
      console.log(data);
      this.data = data;

      this.lineChartData = Object.keys(data).map(key => ({
        symbol: key,
        data: data[key]['chart']
      }))
    });
  }

}

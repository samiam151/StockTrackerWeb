import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServerSentEventService } from '../../../shared/services/server-sent-event.service';
import { StockService } from '../../../shared/services/stock.service';

@Component({
  selector: 'app-stock-detail',
  templateUrl: './stock-detail.component.html',
  styleUrls: ['./stock-detail.component.scss']
})
export class StockDetailComponent implements OnInit, OnDestroy {
  public symbol: string;
  public detail: any = null;

  constructor(
    private route: ActivatedRoute,
    private stock: StockService,
    private sse: ServerSentEventService
  ) { }

  ngOnDestroy(): void {
    console.log("destrying...");
    this.detail = null
  }

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.symbol = data.symbol;

      this.stock.getStockDetail(this.symbol).subscribe(data => {
        this.detail = data;
        console.log(data);
      })

      this.stock.getSSEPrices(this.symbol).subscribe(data => console.log(data));
    })

  }

}

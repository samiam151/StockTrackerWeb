import { viewClassName } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ServerSentEventService } from '../../../../shared/services/server-sent-event.service';
import { StockService } from '../../../../shared/services/stock-service/stock.service';

@Component({
  selector: 'app-stock-detail',
  templateUrl: './stock-detail.component.html',
  styleUrls: ['./stock-detail.component.scss']
})
export class StockDetailComponent implements OnInit, OnDestroy {
  public symbol: string;
  public detail: any = null;
  public noDataAvailable: boolean = false;
  private detailSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private stock: StockService
  ) { }

  ngOnDestroy(): void {
    this.detail = null
    this.detailSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.symbol = data.symbol;

      this.detailSubscription = this.stock.getStockDetail(this.symbol).subscribe(data => {
        this.detail = data;
        if (data === null) this.noDataAvailable = true;
      })
    })
  }

}

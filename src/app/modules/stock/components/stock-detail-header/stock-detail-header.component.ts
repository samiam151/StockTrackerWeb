import { ThisReceiver } from '@angular/compiler';
import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, interval, Observable, of, pipe, Subject, Subscription } from 'rxjs';
import { exhaustMap, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { StockService } from '../../../../shared/services/stock-service/stock.service';
import { UserService } from '../../../../shared/services/user.service';
import { faEye, IconDefinition } from "@fortawesome/free-regular-svg-icons";
@Component({
  selector: 'app-stock-detail-header',
  templateUrl: './stock-detail-header.component.html',
  styleUrls: ['./stock-detail-header.component.scss']
})
export class StockDetailHeaderComponent implements OnInit, OnDestroy {
  public icons = {
    eye: faEye
  }

  @Input() data: any;
  @Input() symbol: any;

  public currentPrice: number;
  public openPrice: number;
  public previousClose: number;

  priceStyle: string;
  latestData: any = null;
  repeater: Subscription;
  intervalTimer: NodeJS.Timeout;

  constructor(private stock: StockService, public user: UserService) {
  }
  ngOnDestroy(): void {
    this.repeater.unsubscribe();
    clearInterval(this.intervalTimer);
  }

  ngOnInit(): void {
    this.intervalTimer = setInterval(() => {
      this.repeater = this.stock.getCurrentStockPrice(this.symbol).pipe(
        tap(data => {
          this.latestData = data;
          let { latestPrice, open, previousClose } = data;
          this.currentPrice = latestPrice;
          this.openPrice = open;
          this.previousClose = previousClose;
          this.priceStyle = "stock-detail-header_price " + (this.currentPrice >= this.previousClose ? "price-up" : "price-down");
        }),
      ).subscribe()
    }, 3000)
  }

  addToWishlist() {
    this.stock.addToWishlist(this.symbol).subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log(err);
      }
    )
  }
}

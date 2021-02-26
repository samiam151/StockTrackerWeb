import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { StockService } from '../../services/stock-service/stock.service';

@Component({
  selector: 'app-stock-page-base',
  template: ``,
})
export class StockPageBaseComponent implements OnInit, OnDestroy {
  protected symbols: string[] = [];
  protected types: string[] = ['chart', 'quote'];

  protected query_results$ = new Subject();

  interval: NodeJS.Timeout;
  subscription: Subscription;

  constructor(private stock: StockService) { }

  ngOnDestroy(): void {
    clearInterval(this.interval);
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    if (this.symbols.length) {
      this.interval = setInterval(() => {
        this.subscription = this.stock.getPageBatches(this.symbols, this.types).subscribe(data => {
          this.query_results$.next(data);
        });
      }, 3000)
    }
  }

}

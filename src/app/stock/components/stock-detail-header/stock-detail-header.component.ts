import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stock-detail-header',
  templateUrl: './stock-detail-header.component.html',
  styleUrls: ['./stock-detail-header.component.scss']
})
export class StockDetailHeaderComponent implements OnInit {

  @Input() data: any;

  public regularMarketPrice: number;
  public previousMarketPrice: number;
  priceStyle: string;

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.data);
    this.regularMarketPrice = this.data.price.regularMarketPrice.raw;
    this.previousMarketPrice = this.data.summaryDetail.previousClose.raw;
    this.priceStyle = "stock-detail-header_price " + (this.regularMarketPrice > this.previousMarketPrice ? "price-up" : "price-down");
  }

}

import { formatDate } from '@angular/common';
import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import * as d3 from 'd3';
import { ApexAxisChartSeries, ApexChart, ApexTitleSubtitle, ApexXAxis, ApexYAxis, NgApexchartsModule } from 'ng-apexcharts';
import { tap } from 'rxjs/operators';
import { StockService } from '../../services/stock-service/stock.service';
import { ChartOptions } from "./candle-chart.model"

@Component({
  selector: 'app-candle-chart',
  templateUrl: './candle-chart.component.html',
  styleUrls: ['./candle-chart.component.scss'],
  providers: [NgApexchartsModule, StockService]
})
export class CandleChartComponent implements OnInit, OnChanges, OnDestroy {
  @Input() symbol: string = "TSLA";
  @Input() interval: number = 300000

  public chartOptions: Partial<ChartOptions> = {};
  public isLoading: boolean = true;
  public data: any;
  clockInterval: NodeJS.Timeout;

  ngOnInit(): void {
    this.clockInterval = setInterval(this.reInit.bind(this), this.interval)
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.reInit()
  }

  ngOnDestroy(): void {
    clearInterval(this.clockInterval);
  }

  constructor(private stock: StockService) { }

  public reInit() {
    this.stock.getIEXChartData(this.symbol).pipe(
        tap(() => this.isLoading = true),
        tap((data) => {
          this.data = data;
          this.init(this.data);
        }),
        tap(() => this.isLoading = false),
      ).subscribe();
  }

  public init(data) {
    this.chartOptions = this.setChartDisplayOptions(this.chartOptions);
    this.chartOptions = this.setChartData(this.chartOptions);
  }

  public setChartDisplayOptions(options: any): Partial<ChartOptions> {
    options.chart = {
      type: "candlestick",
      height: 300
    }

    options.title = {
      text: this.symbol.toUpperCase(),
      align: "left"
    }

    options.xaxis = {
      type: "datetime",
      tooltip: {
        enabled: true,
        formatter: (value) => {
          let date = new Date(value);
          return date.toString();
          // return "test"
        }
      }
    };

    options.yaxis = {
      labels: {
        formatter: function (value) {
          return value;
        }
      }
    };
    return options;
  }

  public setChartData(options: Partial<ChartOptions>): Partial<ChartOptions> {
    let data = this.data.map(d => {
      let date: Date = new Date(d.date);

      if (d.minute) {
        let time = d.minute.split(":");
        date.setHours(time[0]);
        date.setMinutes(time[1]);
      }
      return {
        // x: new Date(d.date),
        x: date,
        y: [d.open, d.high, d.low, d.close]
      }
    })

    options.series = [{
      name: "candle",
      data: data
    }];
    return options;
  }
}

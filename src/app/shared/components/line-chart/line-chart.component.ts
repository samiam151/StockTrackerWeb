import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ApexChart } from 'ng-apexcharts';
import { tap } from 'rxjs/operators';
import { StockService } from '../../services/stock-service/stock.service';
import { ChartOptions } from '../candle-chart/candle-chart.model';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit, OnChanges, OnDestroy {
  @Input() symbol: string;
  @Input() interval: number = 300000;
  @Input() title: string = "";

  public chartOptions: Partial<ChartOptions> = {};
  public isLoading: boolean = true;
  public data: any;
  clockInterval: NodeJS.Timeout;

  constructor(private stock: StockService) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.reInit();
  }

  ngOnDestroy(): void {
    clearInterval(this.clockInterval);
  }

  ngOnInit(): void {
    this.clockInterval = setInterval(this.reInit.bind(this), this.interval)
  }

  public reInit() {
    this.stock.getIEXChartData(this.symbol).pipe(
        tap(() => this.isLoading = true),
        tap((data) => {
          this.data = data.data;
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
    var chart: ApexChart = {
      type: "area",
      height: 350,
      animations: {
        enabled: false
      }
    };
    options.chart = chart;

    options.title = {
      text: this.symbol.toUpperCase(),
      align: "left"
    }

    options.xaxis = {
      type: "datetime",
      formatter: (value) => {
        return value;
      }
    };

    options.dataLabels = {
      enabled: false
    }

    options.stroke = {
      curve: "straight",
      width: 1
    };

    options.yaxis = {
      opposite: true,
      labels: {
        formatter: function (value) {
          return value;
        }
      }
    };
    return options;
  }

  public setChartData(options: Partial<ChartOptions>): Partial<ChartOptions> {
    let data = this.data.filter((d, i) => i % 2 === 0);

    options.series = [{
      name: "Average Price",
      data: data.map((d, i) => {
        if (d.open === null || d.close === null){
          d = data[i - 1];
        }
        if (d.open === null || d.close === null){
          d = data[i - 2];
        }

        let p = (d.open + d.close) / 2;
        return p.toFixed(2);
      })
    }];

    options.labels = data.map(d => {
      let date: Date = new Date(d.date);
      let time = d.minute.split(":");
      date.setHours(time[0]);
      date.setMinutes(time[1]);

      return date.toLocaleString();
    })
    return options;
  }
}

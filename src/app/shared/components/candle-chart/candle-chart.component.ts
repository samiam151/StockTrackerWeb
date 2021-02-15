import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { ApexAxisChartSeries, ApexChart, ApexTitleSubtitle, ApexXAxis, ApexYAxis, NgApexchartsModule } from 'ng-apexcharts';
import { StockService } from '../../services/stock.service';
import { ChartOptions } from "./candle-chart.model"

@Component({
		selector: 'app-candle-chart',
		templateUrl: './candle-chart.component.html',
		styleUrls: ['./candle-chart.component.scss'],
		providers: [NgApexchartsModule, StockService]
})
export class CandleChartComponent implements OnInit {
		@Input() symbol: string = "TSLA";

		public chartOptions: Partial<ChartOptions> = {};
		public isLoading: boolean = true;
		public data: any;


		private svg;
		private margin = 0;
		private width = 750 - (this.margin * 2);
		private height = 400 - (this.margin * 2);

		ngOnInit(): void {
				this.stock.getChartData(this.symbol).subscribe(data => {
						let res = data?.chart?.result[0];
						console.log(res);

						this.data = res;
						this.init(res);
						this.isLoading = !this.isLoading;
				});
		}

		constructor(private stock: StockService) { }

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
										// console.log(date);
										return date.toString();
								}
						}
				};

				options.yaxis = {
						// tooltip: {
						//   enabled: true
						// },
						labels: {
								formatter: function (value) {
										//return Number(value).toFixed(2);
										return value;
								}
						}
				};

				return options;
		}

		private formatTime(time): any { return Number(`${time}000`); }

		public fixData(): any[] {
				let times = this.data.timestamp;
				let { close, high, low, open } = this.data.indicators?.quote[0];

				return times
						.map((time, index) => {
								let formattedTime = this.formatTime(time);
								let start = this.formatTime(this.data.meta.currentTradingPeriod.regular.start);
								let end = this.formatTime(this.data.meta.currentTradingPeriod.regular.end);

								let ds = new Date(start),
										de = new Date(end),
										df = new Date(formattedTime);

								// if (df.getHours() <= de.getHours() && df.getHours() >= ds.getHours())
								// {
								return {
										index: index,
										time: df
								}
								// }
								return null;
						})
						.filter(x => Boolean(x))
						.map(time => {
								return {
										x: time?.time,
										y: [
												Number(open[time?.index]).toFixed(2),
												Number(high[time?.index]).toFixed(2),
												Number(low[time?.index]).toFixed(2),
												Number(close[time?.index]).toFixed(2)
										]
								}
						});
		}

		public setChartData(options: Partial<ChartOptions>): Partial<ChartOptions> {
				options.series = [{
						name: "candle",
						data: this.fixData()
				}];
				return options;
		}
}

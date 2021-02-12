import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { PageNotFoundComponent } from './components/';
import { WebviewDirective } from './directives/';
import { FormsModule } from '@angular/forms';
import { CandleChartComponent } from './components/candle-chart/candle-chart.component';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  declarations: [PageNotFoundComponent, WebviewDirective, CandleChartComponent],
  imports: [CommonModule, TranslateModule, FormsModule, NgApexchartsModule],
  exports: [TranslateModule, WebviewDirective, FormsModule,
    CandleChartComponent
  ]
})
export class SharedModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';

import { PageNotFoundComponent } from './components/';
import { WebviewDirective } from './directives/';
import { FormsModule } from '@angular/forms';
import { CandleChartComponent } from './components/candle-chart/candle-chart.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SymbolSearchComponent } from './components/symbol-search/symbol-search.component';
import { StockTableComponent } from './components/stock-table/stock-table.component';

@NgModule({
  declarations: [PageNotFoundComponent, WebviewDirective, CandleChartComponent, SymbolSearchComponent, StockTableComponent],
  imports: [CommonModule, TranslateModule, FormsModule, NgApexchartsModule, NgSelectModule],
  exports: [
    TranslateModule,
    WebviewDirective,
    FormsModule,
    CandleChartComponent,
    SymbolSearchComponent,
    NgSelectModule,
    StockTableComponent
  ]
})
export class SharedModule {}

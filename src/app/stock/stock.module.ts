import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockDetailComponent } from './pages/stock-detail/stock-detail.component';
import { StockDetailHeaderComponent } from './components/stock-detail-header/stock-detail-header.component';



@NgModule({
  declarations: [StockDetailComponent, StockDetailHeaderComponent],
  imports: [
    CommonModule
  ]
})
export class StockModule { }

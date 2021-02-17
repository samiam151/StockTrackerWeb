import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockDetailComponent } from './pages/stock-detail/stock-detail.component';
import { StockDetailHeaderComponent } from './components/stock-detail-header/stock-detail-header.component';
import { SharedModule } from '../shared/shared.module';
import { RecentlyViewedComponent } from './components/recently-viewed/recently-viewed.component';



@NgModule({
  declarations: [StockDetailComponent, StockDetailHeaderComponent, RecentlyViewedComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    RecentlyViewedComponent
  ]
})
export class StockModule { }

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { StockService } from '../../services/stock.service';

@Component({
  selector: 'app-symbol-search',
  templateUrl: './symbol-search.component.html',
  styleUrls: ['./symbol-search.component.scss']
})
export class SymbolSearchComponent implements OnInit {

  public symbols: any[] = [];
  public chosenSymbol: any;
  public selectLoading = false;

  constructor(private stock: StockService, private router: Router) { }

  ngOnInit(): void {
    this.stock.getAllSymbols().subscribe(data => {
      this.symbols = data.slice(0, 50);
      console.log("Symbols: ", this.symbols)
    })
  }

  searchSymbol({term, items}) {
    this.selectLoading = true
    term = term.toUpperCase();
    this.stock.searchSymbols(term)
      .subscribe(data => {
        this.symbols = data;
        this.selectLoading = false;
      });
  }

  selectSymbol({symbol, name, id})
  {
    console.log("Selected: ", symbol, name, id);
    this.router.navigate(["/stock", symbol]);
  }
}

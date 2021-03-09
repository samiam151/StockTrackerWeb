import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { StockService } from '../../services/stock-service/stock.service';
import symbolsJson from "../../../../assets/symbols.json";

@Component({
  selector: 'app-symbol-search',
  templateUrl: './symbol-search.component.html',
  styleUrls: ['./symbol-search.component.scss']
})
export class SymbolSearchComponent implements OnInit {

  public chosenSymbol: any;
  public selectLoading = false;

  public searchSub$ = new Subject<any>();
  public symbols$: Observable<any[]>;
  symbols: any;
  initSymbols: { symbol: string; exchange: string; exchangeSuffix: string; exchangeName: string; name: string; date: string; type: string; iexId: string; region: string; currency: string; isEnabled: boolean; figi: string; cik: string; lei: string; }[];

  constructor(private stock: StockService, private router: Router) { }

  ngOnInit(): void {
    this.symbols$ = this.searchSub$.pipe(
      tap(d => this.selectLoading = true),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(term => this.stock.searchSymbols(term)),
      tap(d => this.selectLoading = false)
    );

    this.symbols = [];
    this.initSymbols = symbolsJson;
  }

  searchSymbol({term, items}) {
    // if (term.length > 1) this.searchSub$.next(term.toUpperCase());
    term = term.toUpperCase();
    if (term.length > 1) {
      this.symbols = this.initSymbols.filter(sym => {
        return sym.name.toUpperCase().includes(term)
          || sym.symbol.toUpperCase().includes(term);
      })
    }

    if (term.lengh === 0) {
      this.symbols = [];
    }
  }

  selectSymbol({symbol, name})
  {
    this.router.navigate(["/stock", symbol]).then(() => {
      this.chosenSymbol = null;
    });
  }
}

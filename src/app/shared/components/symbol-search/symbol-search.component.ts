import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { StockService } from '../../services/stock-service/stock.service';

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

  constructor(private stock: StockService, private router: Router) { }

  ngOnInit(): void {
    this.symbols$ = this.searchSub$.pipe(
      tap(d => this.selectLoading = true),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(term => this.stock.searchSymbols(term)),
      tap(d => this.selectLoading = false)
    );
  }

  searchSymbol({term, items}) {
    if (term.length > 1) this.searchSub$.next(term.toUpperCase());
  }

  selectSymbol({symbol, name, id})
  {
    console.log("Selected: ", symbol, name, id);
    this.router.navigate(["/stock", symbol]).then(() => {
      this.chosenSymbol = null;
    });
  }
}

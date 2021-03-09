import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { StockService } from './stock-service/stock.service';

export interface IRegisterToken {
  name: string;
  symbols: string[];
  types: string[];
}

function flatDeep(arr, d = Infinity) {
  return d > 0 ? arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatDeep(val, d - 1) : val), [])
               : arr.slice();
};

@Injectable({
  providedIn: 'root'
})
export class StockQueryService {
  private _symbols: string[] = [];
  private _types: string[] = [];
  private _tokens: IRegisterToken[] = [];

  private queries$ = new BehaviorSubject([]);
  public queries_results$ = this.queries$.asObservable();

  get symbols() {
    let syms = flatDeep(this._tokens.map(t => flatDeep(t.symbols)))
    return syms;
  }

  set symbols(symbols: string[]) {
    symbols.forEach(symbol => {
      if (!this._symbols.includes(symbol)) this._symbols.push(symbol);
    })
  }

  get types() {
    let types = flatDeep(this._tokens.map(t => flatDeep(t.types)))
    return types;
  }

  set types(types: string[]) {
    types.forEach(type => {
      if (!this._types.includes(type)) this._types.push(type);
    })
  }

  constructor(private stock: StockService) {
    this.init()
  }

  init(): void {
    setInterval(() => {
      this.stock.getPageBatches(this.symbols, this.types).subscribe(data => {
        this.queries$.next(data);
      })
    }, 4000)
  }

  public register(tokens: IRegisterToken[]) {
    tokens.forEach(token => {
      this._tokens.push(token);
    });

    return this.queries_results$;
  }
}

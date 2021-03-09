import { Inject, InjectionToken } from "@angular/core";
import { type } from "os";
import { StockService } from "../../shared/services/stock-service/stock.service";

export abstract class StockPage {
  protected query_symbols: string[];
  protected query_types: string[];
  protected query_results = null;
  stock: StockService;
  stonks2: any;

  protected constructor(symbols: string[], types: string[]) {
    this.query_symbols = symbols;
    this.query_types = types;


  }

  ngOnInit() {
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface IChartResponse {
  chart: {
    result: Array<any>;
  };
}

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private baseURL: string = "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2";
  private apiKey: string = "1Zhw8FDIhb7pf8HlPRKckMcEfTPWi7FT";
  private apiHost: string = "apidojo-yahoo-finance-v1.p.rapidapi.com";
  private apiHeaders = {
    "x-rapidapi-key": this.apiKey,
    "x-rapidapi-host": this.apiHost
  }

  constructor(
    private http: HttpClient
  ) {
  }

  private withURL = (url: string): string => `${this.baseURL}${url}`;

  getAllSymbols() {
    return this.http.get<any[]>(environment.apiUrl + "/stocksymbol");
  }

  getStockPrice(ticker: string)
  {
    return this.http.get<IChartResponse>(this.withURL(`/get-chart?interval=15m&symbol=${ticker}&range=1d&region=US`), {
      "headers": this.apiHeaders
    });
  }

  searchSymbols(term: string) {
    return this.http.get<any[]>(environment.apiUrl + "/stocksymbol/search?term=" + term);
  }

  getStockDetail(symbol: string)
  {
    return this.http.get<IChartResponse>(this.withURL(`/get-summary?symbol=${symbol}&region=US`), {
      "headers": this.apiHeaders
    });
  }
}

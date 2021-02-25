import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, interval, Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { ServerSentEventService } from "../server-sent-event.service";
import { UserService } from '../user.service';
import { ENV_API, IEX, YAHOO } from "./stock.servce.providers";

export interface IChartResponse {
  chart: {
    result: Array<any>;
  };
}

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private yahoo: YAHOO;
  private iex: IEX;
  private ssAPI: ENV_API;

  constructor(
    private http: HttpClient,
    private sse: ServerSentEventService,
    private user: UserService
  ) {
    this.yahoo = new YAHOO(http);
    this.iex = new IEX(http);
    this.ssAPI = new ENV_API(http);
  }

  getAllSymbols() {
    return this.ssAPI.request<any[]>('/stocksymbol');
  }

  getChartData(ticker: string)
  {
    return this.yahoo.request<any>(`/get-chart?interval=5m&symbol=${ticker}&range=1d&region=US`);
  }

  searchSymbols(term: string) {
    return this.ssAPI.request<any[]>("/stocksymbol/search?term=" + term);
  }

  getStockDetail(symbol: string)
  {
    return this.yahoo.request<IChartResponse>(`/get-summary?symbol=${symbol}&region=US`);
  }

  getCurrentStockPrice(symbol: string) {
    return this.iex.request<any>(`stock/${symbol}/quote`);
  }

  getSSEPrices(symbol: string) {
    return this.sse.getServerSentEvent(
      `https://cloud-sse.iexapis.com/stable/stocksUS?symbols=${symbol}&token=pk_e573e013e7d84d64bed65de21897b165`
    )
  }

  getBatchData(symbols: string[]) {
    let stringSymbols = symbols.join(",");
    return this.iex.request<any>(`stock/market/batch?symbols=${stringSymbols}&types=quote&range=1m`);
  }

  getIEXChartData(symbol: string) {
    return this.iex.request<any>(`stock/${symbol}/intraday-prices`);
  }

  addToWishlist(symbol: string) {
    return this.http.post<any>(environment.apiUrl + "/watchlists/add-watchlist-symbol", {
      symbol: symbol,
      userId: this.user.currentUser.id
    })
  }

}

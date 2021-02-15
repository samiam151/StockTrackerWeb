import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ServerSentEventService } from "../services/server-sent-event.service";

export interface IChartResponse {
  chart: {
    result: Array<any>;
  };
}

export interface IStockDataProvider {
  request<T>(rest: string): Observable<T>
};

class YAHOO implements IStockDataProvider {
  constructor(private http: HttpClient) { }

  private baseUrl: string = "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2";
  private apiKey: string = "1Zhw8FDIhb7pf8HlPRKckMcEfTPWi7FT";
  private apiHost: string = "apidojo-yahoo-finance-v1.p.rapidapi.com";
  private apiHeaders = {
    "x-rapidapi-key": this.apiKey,
    "x-rapidapi-host": this.apiHost
  }

  private withURL = (url: string): string => `${this.baseUrl}${url}`;

  public request<T>(rest: string) {
    return this.http.get<T>(this.withURL(rest), {
        "headers": this.apiHeaders
    });
  }
}


class IEX implements IStockDataProvider {
  constructor(private http: HttpClient) { }
  private DEBUG: boolean = true;

  private version: string = "stable";

  private baseSandboxUrl: string = "https://sandbox.iexapis.com";
  private baseSandboxSSEUrl: string = "https://sandbox-sse.iexapis.com";

  private baseUrl: string = "https://cloud.iexapis.com";

  private secrets = {
    sandbox: {
      secret: "Tsk_1462d2d1d45a47c2b73e3be9634a31ae",
      publishable: "Tpk_7b5b1529d9d647b99b16f92adebe99ba"
    },
    regular: {
      secret: "sk_3f7c20ca27a6410dac29055f59d1322b",
      publishable: "pk_e573e013e7d84d64bed65de21897b165"
    }
  }

  public requestUrl(rest: string) {
    return `${this.baseUrl}/${this.version}/${rest}?token=${this.secrets.regular.publishable}`
  };

  private sandboxRequest<T>(rest: string) {
    return this.http.get<T>(`${this.baseSandboxUrl}/${this.version}/${rest}?token=${this.secrets.sandbox.publishable}`);
  }

  private regularRequest<T>(rest: string) {
    return this.http.get<T>(`${this.baseUrl}/${this.version}/${rest}?token=${this.secrets.regular.publishable}`);
  }

  public request<T>(rest: string) {
    return this.DEBUG ? this.sandboxRequest<T>(rest) : this.regularRequest<T>(rest);
  }
}

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private yahoo: YAHOO;
  private iex: IEX;

  constructor(private http: HttpClient, private sse: ServerSentEventService) {
    this.yahoo = new YAHOO(http);
    this.iex = new IEX(http);
  }

  getAllSymbols() {
    return this.http.get<any[]>(environment.apiUrl + "/stocksymbol");
  }

  getChartData(ticker: string)
  {
    return this.yahoo.request<any>(`/get-chart?interval=15m&symbol=${ticker}&range=1d&region=US`);
  }

  searchSymbols(term: string) {
    return this.http.get<any[]>(environment.apiUrl + "/stocksymbol/search?term=" + term);
  }

  getStockDetail(symbol: string)
  {
    return this.yahoo.request<IChartResponse>(`/get-summary?symbol=${symbol}&region=US`);
  }

  getSSEPrices(symbol: string) {
    return this.sse.getServerSentEvent(
      `https://cloud-sse.iexapis.com/stable/stocksUS?symbols=${symbol}&token=pk_e573e013e7d84d64bed65de21897b165`
    )
  }

}

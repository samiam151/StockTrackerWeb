import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";

export interface IStockDataProvider {
  get<T>(rest: string): Observable<T>
};

/**
 * Data provider for application database
 * @interface IStockDataProvider
 */
export class ENV_API implements IStockDataProvider {
  constructor(private http: HttpClient) { }

  public baseUrl: string = environment.apiUrl;

  get<T>(rest?: string): Observable<T> {
    let url = rest ? `${this.baseUrl}${rest}` : `${this.baseUrl}`;
    return this.http.get<T>(url);
  }

  find<T>(rest: string, id: number): Observable<T> {
    return this.http.get<T>(rest + `?id=${id}`);
  }


}

/**
 * Data provider for YAHOO Finance data
 * @interface IStockDataProvider
 */
export class YAHOO implements IStockDataProvider {
  constructor(private http: HttpClient) { }

  private baseUrl: string = "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2";
  private apiKey: string = "1Zhw8FDIhb7pf8HlPRKckMcEfTPWi7FT";
  private apiHost: string = "apidojo-yahoo-finance-v1.p.rapidapi.com";
  private apiHeaders = {
    "x-rapidapi-key": this.apiKey,
    "x-rapidapi-host": this.apiHost
  }

  private withURL = (url: string): string => `${this.baseUrl}${url}`;

  public get<T>(rest: string) {
    return this.http.get<T>(this.withURL(rest), {
        "headers": this.apiHeaders
    });
  }
}

/**
 * Data provider for IEX Cloud data
 * @interface IStockDataProvider
 */
export class IEX implements IStockDataProvider {
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

  /**
   *
   * @param rest continues from "https://cloud.iexapis.com/stable/___?token=sdfsdf"
   */
  public requestUrl(rest: string) {
    let separator = rest.includes("?") ? "&" : "?"
    return `${this.baseUrl}/${this.version}/${rest}${separator}token=${this.secrets.regular.publishable}`
  };

  private sandboxRequest<T>(rest: string) {
    let separator = rest.includes("?") ? "&" : "?"
    return this.http.get<T>(`${this.baseSandboxUrl}/${this.version}/${rest}${separator}token=${this.secrets.sandbox.publishable}`);
  }

  private regularRequest<T>(rest: string) {
    let separator = rest.includes("?") ? "&" : "?"
    return this.http.get<T>(`${this.baseUrl}/${this.version}/${rest}${separator}token=${this.secrets.regular.publishable}`);
  }

  public get<T>(rest: string) {
    return this.DEBUG ? this.sandboxRequest<T>(rest) : this.regularRequest<T>(rest);
  }
}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StockService } from "../shared/services/stock-service/stock.service";
import { environment } from "../../environments/environment";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [StockService]
})
export class HomeComponent implements OnInit {

  public symbols: string[] = ['GME', 'BB', 'TSLA', 'AAPL'];

  constructor(
    private router: Router,
    private stock: StockService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
  }

  showNotification(message = "No Message") {
    const notification = {
      title: 'Basic Notification',
      body: 'Notification from the Main process'
    }
    let n = new Notification(message);

  }

}

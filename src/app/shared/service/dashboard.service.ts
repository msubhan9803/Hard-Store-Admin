import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { category } from '../models/category';
import { EnvironmentUrlService } from './enviroment-url.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  protected _env: EnvironmentUrlService;
  protected http: HttpClient;
  httpHeaders: any;

  constructor(injector: Injector) {
    this.http = injector.get(HttpClient);
    this._env = injector.get(EnvironmentUrlService);

    // Setting Up token to be passed with request
    // const token = localStorage.getItem('userToken');
    // const SecutiryGroupId = localStorage.getItem("securityGroup");
    // this.httpHeaders = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'Authorization': `Bearer ${token}`,
    //   'GroupId': `${SecutiryGroupId}`
    // });
  }

  // GET: dashboard/getTilesData
  public getTilesData() {
    let body = JSON.stringify(1)
    let url = this._env.urlAddress + 'dashboard/getTilesData';
    return this.http.post(url, body);
  }

  // GET: dashboard/getLatestOrders
  public getLatestOrders() {
    let url = this._env.urlAddress + 'dashboard/getLatestOrders';
    return this.http.get(url);
  }

  // GET: dashboard/salesBySource
  public salesBySource() {
    let url = this._env.urlAddress + 'dashboard/salesBySource';
    return this.http.get(url);
  }

  // GET: dashboard/getMessages
  public getMessages() {
    let url = this._env.urlAddress + 'dashboard/getMessages';
    return this.http.get(url);
  }
}

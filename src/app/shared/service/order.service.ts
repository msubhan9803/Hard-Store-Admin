import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { category } from '../models/category';
import { EnvironmentUrlService } from './enviroment-url.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
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

  // GET: getOrders
  public getOrders() {
    let url = this._env.urlAddress + 'order/getOrders';
    return this.http.get(url);
  }

  // GET: updateOrderStatus
  public updateOrderStatus(payload) {
    let url = this._env.urlAddress + 'order/updateOrderStatus';
    return this.http.put(url, payload);
  }

  // GET: order/getOrderbyId/
  public getOrderbyId(orderId) {
    let url = this._env.urlAddress + 'order/getOrderbyId/' + orderId;

    return this.http.get(url);
  }

  // POST: order/createOrder
  public createOrderAPI(productObj: any) {
    let url = this._env.urlAddress + 'order/createOrder';

    return this.http.post(url, productObj);
  }
}

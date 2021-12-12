import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { category } from '../models/category';
import { EnvironmentUrlService } from './enviroment-url.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
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

  // GET: user/getCurrency
  public getCurrency() {
    let url = this._env.urlAddress + 'GetCurrency';
    return this.http.get(url);
  }

  // PUT: updateCurrency
  public updateCurrency(payload) {
    let url = this._env.urlAddress + 'UpdateCurrency/';
    return this.http.put(url, payload);
  }

  // GET: user/getContactMessages
  public getContactMessages() {
    let url = this._env.urlAddress + 'getContactMessages';
    return this.http.get(url);
  }
}

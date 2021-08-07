import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { category } from '../models/category';
import { EnvironmentUrlService } from './enviroment-url.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
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

  // GET: category/getProducts
  public getProducts() {
    let url = this._env.urlAddress + 'category/getProducts';
    return this.http.get(url);
  }

  // POST: category/addProduct
  public addProduct(productObj: any) {
    let url = this._env.urlAddress + 'products/addProduct';
    // let body = JSON.stringify(productObj);

    return this.http.post(url, productObj);
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
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
  public Currency = { name: 'AED', currency: 'AED', price: 1 } // Default Currency

  // GET: get api url
  public getImageUrl() {
    return this._env.imageAddress;
  }

  // GET: products/getProducts
  public getProducts() {
    let url = this._env.urlAddress + 'products/getProducts';
    return this.http.get(url);
  }

  // GET: products/getProductsName
  public getProductsName() {
    let url = this._env.urlAddress + 'products/getProductsName';
    return this.http.get(url);
  }

  // GET: products/getProductById
  public getProductById(id) {
    let url = this._env.urlAddress + 'products/getProductById/' + id;
    return this.http.get(url);
  }

  // POST: products/addProduct
  public addProduct(productObj: any) {
    let url = this._env.urlAddress + 'products/addProduct';
    // let body = JSON.stringify(productObj);

    return this.http.post(url, productObj);
  }

  // PUT: product/activeSale
  public activeSale(productId, saleVal) {
    let payload = {
      id: productId,
      sale: saleVal
    }
    let url = this._env.urlAddress + 'products/activeSale';
    // let body = JSON.stringify(productObj);

    return this.http.put(url, payload);
  }

  // GET: products/getProducts
  public getReviews() {
    let url = this._env.urlAddress + 'products/getReviews';
    return this.http.get(url);
  }

  // GET: products/getProducts
  public deleteReviews(reviewId) {
    let url = this._env.urlAddress + 'products/deleteReview/' + reviewId;
    let body = JSON.stringify(reviewId);

    return this.http.delete(url);
  }

  // GET: products/getFaqs
  public getFaqs() {
    let url = this._env.urlAddress + 'products/getFaqs';
    return this.http.get(url);
  }

  // GET: products/getFaqsByType
  public getFaqsByType(type) {
    let url = this._env.urlAddress + 'products/getFaqsByType/' + type;
    return this.http.get(url);
  }

  // POST: submitFAQ
  public addFaq(payload) {
    let url = this._env.urlAddress + 'products/submitFAQ';
    // let body = JSON.stringify(productObj);

    return this.http.post(url, payload);
  }

  // POST: submitFAQ
  public updateFaqById(payload) {
    let url = this._env.urlAddress + 'products/updateFaqById';
    // let body = JSON.stringify(productObj);

    return this.http.put(url, payload);
  }
}

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
    let url = this._env.urlAddress + 'product/GetProducts';
    return this.http.get(url);
  }

  // GET: products/getProductsName
  public getProductsName() {
    let url = this._env.urlAddress + 'products/getProductsName';
    return this.http.get(url);
  }

  // GET: products/getProductById
  public getProductById(id) {
    let url = this._env.urlAddress + 'product/GetProductById/' + id;
    return this.http.get(url);
  }

  // POST: products/addProduct
  public addProduct(productObj: any) {
    let url = this._env.urlAddress + 'product/AddProduct';
    // let body = JSON.stringify(productObj);

    return this.http.post(url, productObj);
  }

  // PUT: product/updateProduct
  public updateProduct(productObj: any) {
    let url = this._env.urlAddress + 'product/UpdateProduct';
    // let body = JSON.stringify(productObj);

    return this.http.put(url, productObj);
  }

  // POST: product/UploadProductImg
  public updateProductImage(productObj: any) {
    let url = this._env.urlAddress + 'product/UploadProductImg';
    // let body = JSON.stringify(productObj);

    return this.http.post(url, productObj);
  }

  // GET: products/getProducts
  public removeImageFromProduct(payload) {
    console.log("removeImageFromProduct payload: ", payload)
    let url = this._env.urlAddress + 'product/RemoveImageFromProduct';
    let body = JSON.stringify(payload);

    return this.http.post(url, payload);
  }

  // GET: products/getCategories
  public getCategories() {
    let url = this._env.urlAddress + 'product/getCategories';
    return this.http.get(url);
  }

  // PUT: product/activeSale
  public activeSale(productId, saleVal) {
    let payload = {
      ProductId: productId,
      sale: saleVal
    }
    let url = this._env.urlAddress + 'product/SaleOn';
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

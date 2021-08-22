import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { category } from '../models/category';
import { EnvironmentUrlService } from './enviroment-url.service';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
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

  // GET: blog/getBlogs
  public getBlogs() {
    let url = this._env.urlAddress + 'blog/getBlogs';
    return this.http.get(url);
  }

  // GET: blog/createBlog
  public createBlog(payload) {
    let url = this._env.urlAddress + 'blog/createBlog';
    return this.http.post(url, payload);
  }
}

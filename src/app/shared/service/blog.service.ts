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

  // GET: blog/getBlogs
  public getBlogById(id) {
    let url = this._env.urlAddress + 'blog/getBlogById/' + id;
    return this.http.get(url);
  }

  // POST: blog/createBlog
  public createBlog(payload) {
    let url = this._env.urlAddress + 'blog/createBlog';
    return this.http.post(url, payload);
  }

  // PUT: blog/updateBlog
  public updateBlog(id, payload) {
    let url = this._env.urlAddress + 'blog/updateBlog/' + id;
    return this.http.put(url, payload);
  }

  // PUT: blog/createBlog
  public updateBlogImage(id, payload) {
    let url = this._env.urlAddress + 'blog/UpdateBLogImg/' + id;
    return this.http.put(url, payload);
  }

  // DELETE: blog/deleteBlog
  public deleteBlog(id) {
    let url = this._env.urlAddress + 'blog/deleteBlog/' + id;
    return this.http.delete(url);
  }
}

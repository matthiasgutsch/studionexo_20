import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  http = inject(HttpClient);

  readonly getBlogPosts_URL = `https://api.studionexo.com/comuni`;
  readonly getPosts_URL = `https://api.studionexo.com/category`;

  // Get Blog posts
  async getBlogPosts(): Promise<any> {
    return new Promise((resolve, reject) => {
      return (
        this.http
          .get(this.getBlogPosts_URL)
          // .pipe( map( data => new BlogsResponse(data) ) ) // for converting data into model class
          .subscribe({
            next: (res) => {
              resolve(res);
            },
            error: (error) => {
              console.log(error);
              reject(error);
            },
            complete() {},
          })
      );
    });
  }
  async getPosts(): Promise<any> {
    return new Promise((resolve, reject) => {
      return (
        this.http
          .get(this.getPosts_URL)
          // .pipe( map( data => new BlogsResponse(data) ) ) // for converting data into model class
          .subscribe({
            next: (res) => {
              resolve(res);
            },
            error: (error) => {
              console.log(error);
              reject(error);
            },
            complete() {},
          })
      );
    });
  }
  getBlogDetail(id: string) {
    return this.http.get<any>(`${this.getBlogPosts_URL}/slug/${id}`);
  }

  getPostDetail(slug: any) {
    return this.http.get<any>(`${this.getPosts_URL}/slug/${slug}`);
  }
}

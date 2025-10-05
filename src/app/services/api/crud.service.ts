import { Observable, throwError } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpParams,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { inject, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CrudOperations } from './crud-operations.interface';

export abstract class CrudService<T, ID> implements CrudOperations<T, ID> {
  returnUrl: string = '';
  loginError: string = '';
  username: string = '';
  user_id: number = 0;
  size: number = 0;
  pages: any[] = [];
  error: {} = {};

  constructor(
    protected http: HttpClient,
    protected _base: string,
    @Inject(PLATFORM_ID) protected platformId: object
  ) {}

  getParams(params: HttpParams, pars: any): HttpParams {
    if (pars.name) {
      params = params.append('name', pars.name);
    }
    if (pars.description) {
      params = params.append('description', pars.description);
    }
    if (pars.code) {
      params = params.append('code', pars.code);
    }

    if (pars.tags) {
      params = params.append('tags', pars.tags);
    }

    if (pars.level) {
      params = params.append('level', pars.level);
    }

    if (pars._sort_field) {
      params = params.append('_sort_field', pars._sort_field);
    }

    if (pars._sort_order) {
      params = params.append('_sort_order', pars._sort_order);
    }

    if (pars.code_int) {
      params = params.append('code_int', pars.code_int);
    }
    if (pars.brand) {
      params = params.append('brand', pars.brand);
    }
    if (pars.dateFrom) {
      params = params.append('date_from', pars.dateFrom);
    }
    if (pars.employee) {
      params = params.append('employee', pars.employee);
    }
    if (pars.dateTo) {
      params = params.append('date_to', pars.dateTo);
    }

    if (pars.orderBy) {
      params = params.append('orderBy', pars.orderBy);
    }

    if (pars.is_featured) {
      params = params.append('is_featured', pars.is_featured);
    }

    if (pars.orderByType) {
      params = params.append('orderByType', pars.orderByType);
    }

    params = params.append('_start', pars.page);
    if (pars.size) {
      params = params.append('_limit', pars.size);
    }
    return params;
  }

  public find(id: string): Observable<T> {
    return this.http.get<T>(this._base + '/' + id).pipe(
      map((res) => {
        const t: any = res as any; // json();
        return t;
      }),
      catchError(this.handleError)
    );
  }

  getAllList() {
    return this.http
      .get<T>(this._base + '/')
      .pipe(catchError(this.handleError));
  }

  getCategoresFeatured() {
    return this.http
      .get<T>(this._base + '/categories_featured')
      .pipe(catchError(this.handleError));
  }

  getCategoresRandom() {
    return this.http
      .get<T>(this._base + '/categories_random')
      .pipe(catchError(this.handleError));
  }

  getLikes_id(id: ID) {
    return this.http
      .get<T>(this._base + '/get_likes_id')
      .pipe(catchError(this.handleError));
  }

  public getAllListNew(pars: any, id: ID): Observable<T[]> {
    let params = new HttpParams();
    params = this.getParams(params, pars);
    return this.http
      .get<HttpResponse<T[]>>(this._base + '/list_user/' + id, {
        observe: 'response',
        params,
      })
      .pipe(
        map((res) => {
          const totalCountHeader = res.headers.get('x-total-count');
          this.size = totalCountHeader !== null ? +totalCountHeader : 0;
          const ts: any = res.body;
          return ts;
        }),
        catchError(this.handleError)
      );
  }

  public getStartupNews(pars: any, id: ID): Observable<T[]> {
    let params = new HttpParams();
    params = this.getParams(params, pars);
    return this.http
      .get<HttpResponse<T[]>>(this._base + '/list_public/' + id, {
        observe: 'response',
        params,
      })
      .pipe(
        map((res) => {
          const totalCountHeader = res.headers.get('x-total-count');
          this.size = totalCountHeader !== null ? +totalCountHeader : 0;

          const ts: any = res.body;
          return ts;
        }),
        catchError(this.handleError)
      );
  }

  public list(pars: any): Observable<T[]> {
    let params = new HttpParams();
    params = this.getParams(params, pars);
    return this.http
      .get<HttpResponse<T[]>>(this._base + '/', {
        observe: 'response',
        params,
      })
      .pipe(
        map((res) => {
          const totalCountHeader = res.headers.get('x-total-count');
          this.size = totalCountHeader !== null ? +totalCountHeader : 0;
          const ts: any = res.body;
          return ts;
        }),
        catchError(this.handleError)
      );
  }

  get_slug(id: any) {
    return this.http
      .get<T>(this._base + '/slug/' + id)
      .pipe(catchError(this.handleError));
  }

  getId(id: ID) {
    return this.http
      .get<T>(this._base + '/id/' + id + '/')
      .pipe(catchError(this.handleError));
  }

  getAllListbyUser(userId: number) {
    return this.http
      .get<T>(this._base + '/user/' + userId)
      .pipe(catchError(this.handleError));
  }

  create(blog: any, userId: number) {
    return this.http
      .post<any>(this._base + '/create/' + userId, blog)
      .pipe(catchError(this.handleError));
  }

  update(blog: any, id: number, userId: number) {
    return this.http
      .post<any>(this._base + '/update/' + id + '/' + userId, blog)
      .pipe(catchError(this.handleError));
  }

  delete(id: number, userId: number) {
    return this.http
      .delete(this._base + '/delete/' + id + '/' + userId)
      .pipe(catchError(this.handleError));
  }

  save(t: T): Observable<T> {
    return this.http.post<T>(this._base, t);
  }

  private handleError = (error: HttpErrorResponse) => {
    let errorMessage: string;

    if (
      isPlatformBrowser(this.platformId) &&
      error.error instanceof ErrorEvent
    ) {
      console.error('Client-side error:', error.error.message);
      errorMessage = `Client-side error: ${error.error.message}`;
    } else if (error.status) {
      console.error(
        `Server returned code ${error.status}, body was: ${error.error}`
      );
      errorMessage = `Server-side error: ${error.status} - ${error.message}`;
    } else {
      console.error('An unexpected error occurred:', error);
      errorMessage = 'An unexpected error occurred.';
    }

    return throwError(() => new Error(errorMessage));
  };
}

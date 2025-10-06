import { Injectable, makeStateKey, TransferState } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of, forkJoin } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiService } from '../services/api/api.service';

const BLOG_DATA_KEY = makeStateKey<any>('blog-detail');

@Injectable({
  providedIn: 'root',
})
export class BlogDetailResolver implements Resolve<any> {
  constructor(private api: ApiService, private state: TransferState) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    // Check if the state already exists (for client-side rendering)
    if (this.state.hasKey(BLOG_DATA_KEY)) {
      return of(this.state.get(BLOG_DATA_KEY, null));
    }

    const urlSegments = route.url.map((segment) => segment.path);
    if (urlSegments.length < 2) return of(null);

    const slug = urlSegments[0];
    const secondSlug = urlSegments[1];

    return forkJoin({
      blog: this.api.getBlogDetail(secondSlug),
      category: this.api.getPostDetail(slug),
    }).pipe(
      map((data) => {
        this.state.set(BLOG_DATA_KEY, data); // Save data for client-side reuse
        return data;
      }),
      catchError(() => of(null))
    );
  }
}

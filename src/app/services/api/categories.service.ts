import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CrudService } from './crud.service';
import { environment } from '../../environments/environment';
import { Categories } from '../../models/categories';

@Injectable({
  providedIn: 'root',
})
export class CategoryService extends CrudService<Categories, number> {
  constructor(http: HttpClient, @Inject(PLATFORM_ID) platformId: object) {
    super(http, `${environment.baseUrl}/category`, platformId);
  }
}

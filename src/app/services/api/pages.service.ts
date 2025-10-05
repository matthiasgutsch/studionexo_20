import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CrudService } from './crud.service';
import { environment } from '../../environments/environment';
import { Pages } from '../../models/pages';

@Injectable({
  providedIn: 'root',
})
export class PagesService extends CrudService<Pages, number> {
  constructor(http: HttpClient, @Inject(PLATFORM_ID) platformId: object) {
    super(http, `${environment.baseUrl}/pages`, platformId);
  }
}

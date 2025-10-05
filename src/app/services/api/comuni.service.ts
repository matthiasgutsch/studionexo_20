import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CrudService } from './crud.service';
import { environment } from '../../environments/environment.prod';
import { Comuni } from '../../models/comuni';

@Injectable({
  providedIn: 'root',
})
export class ComuniService extends CrudService<Comuni, number> {
  constructor(http: HttpClient, @Inject(PLATFORM_ID) platformId: object) {
    super(http, `${environment.baseUrl}/comuni`, platformId);
  }
}

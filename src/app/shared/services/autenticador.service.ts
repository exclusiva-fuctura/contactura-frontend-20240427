import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { DaoService } from './dao.service';

import { AppSettings } from 'src/app/app.settings';
import { ILogin } from '../models/login.interface';

@Injectable({
  providedIn: 'root'
})
export class AutenticadorService {

  constructor(
    private daoService: DaoService
  ) { }

  public autenticador(login: ILogin): Observable<HttpResponse<ILogin>> {
    return this.daoService.post<ILogin>(AppSettings.AUTENTICADOR, login, DaoService.MEDIA_TYPE_APP_JSON);
  }
}

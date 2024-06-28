import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserFormParams } from '../../entities/security/user-form-params';
import { Observable } from 'rxjs';

import {environment} from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ParamService {

  constructor(protected client: HttpClient) { }

  getParams(): Observable<UserFormParams> {

    return this.client.get<UserFormParams>(`${environment.baseUrl}/params/user-params`)
  }

  getMMLType():Observable<any> {
    return this.client.get<any>(`${environment.baseUrl}/security/neiran/params`)
  }

  threahold(): Observable<any> {
    return this.client.get<any>(`${environment.baseUrl}/security/thresholds/params`)
  }
  
  evaluationThreahold(): Observable<any> {
    return this.client.get<any>(`${environment.baseUrl}/security/evaluation/thresholds/params`)
  }

}

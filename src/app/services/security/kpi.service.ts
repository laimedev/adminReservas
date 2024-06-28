import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { Observable } from 'rxjs';
import { Kpi } from '../../entities/security/kpi';
import { PageRequest, Page } from 'src/app/utils/paginator/page-utils';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class KpiService {

  constructor(protected client: HttpClient) { }

  getAll(request: PageRequest<Kpi>): Observable<Page<Kpi>> {

    const params = new HttpParams().set('json', JSON.stringify(request));

    return this.client.get<Page<Kpi>>(environment.baseUrl + '/security/kpis', { params })

  }

  delete(kpi: Kpi): Observable<Kpi> {
    return this.client.delete<Kpi>(environment.baseUrl + '/security/kpis/' + kpi.id)

  }

  createKpi(entity: Kpi): Observable<Kpi> {
    return this.client.post<Kpi>(`${environment.baseUrl}/security/kpis`, entity)
  }

  getById(kpi: Kpi): Observable<Kpi> {

    return this.client.get<Kpi>(environment.baseUrl + '/security/kpis/' + kpi.id)
  }

  editKpi(kpi: Kpi): Observable<Kpi> {

    return this.client.put<Kpi>(environment.baseUrl + '/security/kpis/' + kpi.id, kpi);
  }

  public export(filter: PageRequest<Kpi>): Observable<any> {


    return this.client.post(`${environment.baseUrl}/security/export/kpis`, filter).pipe(map(function (data: any) {

     data.data.map(function (item: any) {

        item.fecha_creacion = item.createdat;
        delete item.createdat;
        // return item;
      })
      
      return data.data;
    }))
  }

}

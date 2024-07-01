import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CrudService } from 'src/app/utils/crud-table';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservasService extends CrudService<any>{

  override  API_URL = `${environment.baseUrl}reporte/list`;

  apiUrl: string = environment.baseUrl; 


  constructor(private _httpClient: HttpClient,
    protected router: Router,
    protected fb: FormBuilder) {

      super(_httpClient); }


      getClientes(searchTerm?: any): Observable<any> {
        let url = `${this.apiUrl}client/listSelect`;
        if (searchTerm) {
          url += `?searchTerm=${searchTerm}`;
        }
        return this.http.get(url);
      }

      getSucursal(): Observable<any> {
        return this.http.get(`${this.apiUrl}sucursal/list`)
      }

      deleteByVentaId(data: any): Observable<any> {
        return this.http.delete<any>(environment.baseUrl + 'reporte/delete/' + data.venta_id)
      }

      // exportFile(params: any): Observable<Blob> {
      //   return this.http.post(`${environment.baseUrl}reporte/export-excel`, params, {
      //     responseType: 'blob'
      //   });
      // }


      exportFile(params: any): Observable<Blob> {
        let queryParams = new HttpParams();
        for (let key in params) {
          if (params[key] !== null && params[key] !== undefined) {
            queryParams = queryParams.append(key, params[key]);
          }
        }
        return this.http.get(`${environment.baseUrl}reporte/export-excel`, {
          params: queryParams,
          responseType: 'blob'
        });
      }
      

      createPayment(dataForm: any){
        return this.http.post<any>(`${environment.baseUrl}registro-cliente/registrar-pago`, dataForm)
      }

      updateStatus(id: any){
        return this.http.put<any>(`${environment.baseUrl}registro-cliente/confirmar/${id}`, null)
      }
      

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/utils/crud-table';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PagosService extends CrudService<any>{

  override  API_URL = `${environment.baseUrl}pagos/list`;


  constructor(private _httpClient: HttpClient,
    protected router: Router,
    protected fb: FormBuilder) {

      super(_httpClient); }



      exportFile() {
        return this.http.post(`${environment.baseUrl}pagos/export-excel`, {}, {
          responseType: 'blob'
        });
      }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AjustesService {

  constructor(private _httpClient: HttpClient) { }

  getById(id: any): Observable<any> {
    return this._httpClient.get<any>(environment.baseUrl + `empresa/${id}`)
  }


  edit(data: any, id: any): Observable<any> {
    const fd = new FormData();
    fd.append('nombre',data.nombre);
    fd.append('direccion',data.direccion);
    fd.append('telefono',data.telefono);
    fd.append('logo',data.logo);
    return this._httpClient.put<any>(`${environment.baseUrl}empresa/edit/${id}`, fd)
  }
  
}

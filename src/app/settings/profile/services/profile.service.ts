import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private _httpClient: HttpClient) { }

  getById(id: any): Observable<any> {
    return this._httpClient.get<any>(environment.baseUrl + `admin/${id}`)
  }


  edit(data: any, id: any): Observable<any> {
    const fd = new FormData();
    fd.append('nombres',data.nombres);
    fd.append('telefono',data.telefono);
    fd.append('email',data.email);
    fd.append('numDocumento',data.numDocumento);
    fd.append('direccion',data.direccion);
    fd.append('tipo',data.tipo);
    fd.append('password',data.password);
    fd.append('passwordConfirmation',data.passwordConfirmation);
    fd.append('foto',data.foto);
    return this._httpClient.put<any>(`${environment.baseUrl}admin/edit/profile/${id}`, fd)
  }
  
}

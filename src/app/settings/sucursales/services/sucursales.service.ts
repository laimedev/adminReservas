import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { CrudService } from 'src/app/utils/crud-table';
import { Sucursal } from 'src/app/entities/modulos/sucursal';


@Injectable({
  providedIn: 'root'
})
export class SucursalesService extends CrudService<any>{


  override  API_URL = `${environment.baseUrl}sucursal/list`;
  


  formGroup: any;

  constructor(private _httpClient: HttpClient,
    protected router: Router,
    protected fb: FormBuilder) {

      super(_httpClient);

      this.formGroup = this.fb.group({
        nomSucursal: ['', [Validators.required]],
        telefono: ['', [Validators.required]],
        email: ['', [Validators.required]],
        direccion: ['', [Validators.required]],
      })      
      
      
    }



    get form (): FormGroup { return this.formGroup; }

    set fillForm(sucursal: Sucursal) {
    this.formGroup.get('nomSucursal').setValue(sucursal.nomSucursal)
    this.formGroup.get('telefono').setValue(sucursal.telefono)
    this.formGroup.get('email').setValue(sucursal.email)
    this.formGroup.get('direccion').setValue(sucursal.direccion)
    }


    getById(empleado: Sucursal): Observable<Sucursal> {
    return this.http.get<Sucursal>(environment.baseUrl + `sucursal/${empleado.codSucursal}`)
    }

    create2(usuario: Sucursal): Observable<Sucursal> {
    return this.http.post<Sucursal>(`${environment.baseUrl}sucursal/register`, usuario)
    }

    edit(empleado: Sucursal, usuario: any): Observable<Sucursal> {
    return this.http.put<Sucursal>(environment.baseUrl + 'sucursal/edit/' + empleado.codSucursal, usuario);
    }

    changeStatus(empleado: Sucursal, usuario: any): Observable<Sucursal> {
      return this.http.put<Sucursal>(environment.baseUrl + 'sucursal/changeStatus/' + empleado.codSucursal, usuario);
      }

    delete2(usuario: Sucursal): Observable<Sucursal> {
    return this.http.delete<Sucursal>(environment.baseUrl + 'sucursal/delete/' + usuario.codSucursal)
    }

    exportFile() {
      return this.http.post(`${environment.baseUrl}sucursal/export-excel`, {}, {
        responseType: 'blob' // Indicar que la respuesta es un blob (archivo)
      });
    }

    getSucursal(): Observable<any> {
      return this.http.get(`${environment.baseUrl}sucursal/list`)
    }
  
    
}
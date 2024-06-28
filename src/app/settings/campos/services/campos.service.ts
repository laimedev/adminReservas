import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Campo } from 'src/app/entities/modulos/campos';
import { CrudService } from 'src/app/utils/crud-table';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CamposService extends CrudService<any>{

  override  API_URL = `${environment.baseUrl}localidades/list`;


  formGroup: any;

  constructor(private _httpClient: HttpClient,
    protected router: Router,
    protected fb: FormBuilder) {

      super(_httpClient); 

      this.formGroup = this.fb.group({
        nomLocalidad: ['', [Validators.required]],
        codSucursal: ['', [Validators.required]],
        precioDia: ['', [Validators.required]],
        precioNoche: ['', [Validators.required]],
        precioMenores: ['', [Validators.required]],
        precioAdultosMayor: ['', [Validators.required]],
        precioVecinosSI: ['', [Validators.required]],
        precioVecinosVSP: ['', [Validators.required]],
      }) 

    }


    get form (): FormGroup { return this.formGroup; }

    set fillForm(campo: Campo) {
    this.formGroup.get('nomLocalidad').setValue(campo.nomLocalidad)
    this.formGroup.get('codSucursal').setValue(campo.codSucursal)
    this.formGroup.get('precioDia').setValue(campo.precioDia)
    this.formGroup.get('precioNoche').setValue(campo.precioNoche)
    this.formGroup.get('precioMenores').setValue(campo.precioMenores)
    this.formGroup.get('precioAdultosMayor').setValue(campo.precioAdultosMayor)
    this.formGroup.get('precioVecinosSI').setValue(campo.precioVecinosSI)
    this.formGroup.get('precioVecinosVSP').setValue(campo.precioVecinosVSP)
    }


    getById(empleado: Campo): Observable<Campo> {
      return this.http.get<Campo>(environment.baseUrl + `localidades/${empleado.codLocalidad}`)
      }
  
      create2(usuario: Campo): Observable<Campo> {
      return this.http.post<Campo>(`${environment.baseUrl}localidades/register`, usuario)
      }
  
      edit(empleado: Campo, usuario: any): Observable<Campo> {
      return this.http.put<Campo>(environment.baseUrl + 'localidades/edit/' + empleado.codLocalidad, usuario);
      }
  
      changeStatus(empleado: Campo, usuario: any): Observable<Campo> {
        return this.http.put<Campo>(environment.baseUrl + 'localidades/changeStatus/' + empleado.codLocalidad, usuario);
        }
  
      delete2(usuario: Campo): Observable<Campo> {
      return this.http.delete<Campo>(environment.baseUrl + 'localidades/delete/' + usuario.codLocalidad)
      }
  
  
      exportFile() {
        return this.http.post(`${environment.baseUrl}localidades/export-excel`, {}, {
          responseType: 'blob' // Indicar que la respuesta es un blob (archivo)
        });
      }


      getSucursal(): Observable<any> {
        return this.http.get(`${environment.baseUrl}sucursal/list`)
      }
    



}

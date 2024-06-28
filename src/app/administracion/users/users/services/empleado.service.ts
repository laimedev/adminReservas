import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CrudService } from 'src/app/utils/crud-table';
import { Usuario } from 'src/app/entities/modulos/usuario';


const base_url = environment.url;


@Injectable({
  providedIn: 'root'
})
export class EmpleadoService  extends CrudService<any>{


  override  API_URL = `${environment.baseUrl}admin/list`;
  


  formGroup: any;

  constructor(private _httpClient: HttpClient,
    protected router: Router,
    protected fb: FormBuilder) {

      super(_httpClient);

      this.formGroup = this.fb.group({
        numDocumento: ['', [Validators.required]],
        nombres: ['', [Validators.required]],
        email: ['', [Validators.required]],
        telefono: ['', [Validators.required]],
        tipo: ['', [Validators.required]],
        password: [''],
        passwordConfirmation: [''],
      })      
      
      
    }



    get form (): FormGroup { return this.formGroup; }

    set fillForm(usuario: Usuario) {
    this.formGroup.get('numDocumento').setValue(usuario.numDocumento)
    this.formGroup.get('nombres').setValue(usuario.nombres)
    this.formGroup.get('email').setValue(usuario.email)
    this.formGroup.get('telefono').setValue(usuario.telefono)
    this.formGroup.get('password').setValue(usuario.password)
    this.formGroup.get('passwordConfirmation').setValue(usuario.passwordConfirmation)
    this.formGroup.get('tipo').setValue(usuario.tipo)
    }


    getById(empleado: Usuario): Observable<Usuario> {
    return this.http.get<Usuario>(environment.baseUrl + `admin/${empleado.codUsuario}`)
    }

    create2(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${environment.baseUrl}admin/register`, usuario)
    }

    edit(empleado: Usuario, usuario: any): Observable<Usuario> {
    return this.http.put<Usuario>(environment.baseUrl + 'admin/edit/' + empleado.codUsuario, usuario);
    }

    changeStatus(empleado: Usuario, usuario: any): Observable<Usuario> {
      return this.http.put<Usuario>(environment.baseUrl + 'admin/changeStatus/' + empleado.codUsuario, usuario);
      }

    delete2(usuario: Usuario): Observable<Usuario> {
    return this.http.delete<Usuario>(environment.baseUrl + 'admin/delete/' + usuario.codUsuario)
    }


    exportFile() {
      return this.http.post(`${environment.baseUrl}admin/export-excel`, {}, {
        responseType: 'blob' // Indicar que la respuesta es un blob (archivo)
      });
    }
  
    
}

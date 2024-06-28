import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Cliente } from 'src/app/entities/modulos/cliente';
import { CrudService } from 'src/app/utils/crud-table';
import { environment } from 'src/environments/environment';


const base_url = environment.url;



@Injectable({
  providedIn: 'root'
})
export class ClientService extends CrudService<any>{


  override  API_URL = `${environment.baseUrl}client/list`;
  


  formGroup: any;

  constructor(private _httpClient: HttpClient,
    protected router: Router,
    protected fb: FormBuilder) {

      super(_httpClient);

      this.formGroup = this.fb.group({
        tipo_documento: ['', [Validators.required]],
        numDocumento: ['', [Validators.required]],
        nombres: ['', [Validators.required]],
        primer_apellido: ['', [Validators.required]],
        segundo_apellido: ['', [Validators.required]],
        fechNac: ['', [Validators.required]],
        genero: ['', [Validators.required]],
        email: ['', [Validators.required]],
        telefono: ['', [Validators.required]],
        tipo: ['', [Validators.required]],
        password: [''],
        passwordConfirmation: [''],
      })      
      
      
    }



    get form (): FormGroup { return this.formGroup; }

    set fillForm(usuario: Cliente) {
    this.formGroup.get('tipo_documento').setValue(usuario.tipo_documento)
    this.formGroup.get('numDocumento').setValue(usuario.numDocumento)
    this.formGroup.get('nombres').setValue(usuario.nombres)
    this.formGroup.get('primer_apellido').setValue(usuario.primer_apellido)
    this.formGroup.get('segundo_apellido').setValue(usuario.segundo_apellido)
    this.formGroup.get('fechNac').setValue(usuario.fechNac)
    this.formGroup.get('email').setValue(usuario.email)
    this.formGroup.get('genero').setValue(usuario.genero)
    this.formGroup.get('telefono').setValue(usuario.telefono)
    this.formGroup.get('password').setValue(usuario.password)
    this.formGroup.get('passwordConfirmation').setValue(usuario.passwordConfirmation)
    this.formGroup.get('tipo').setValue(usuario.tipo)
    }


    getById(empleado: Cliente): Observable<Cliente> {
    return this.http.get<Cliente>(environment.baseUrl + `client/${empleado.codCliente}`)
    }

    create2(usuario: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${environment.baseUrl}client/register`, usuario)
    }

    edit(empleado: Cliente, usuario: any): Observable<Cliente> {
    return this.http.put<Cliente>(environment.baseUrl + 'client/edit/' + empleado.codCliente, usuario);
    }

    changeStatus(empleado: Cliente, usuario: any): Observable<Cliente> {
      return this.http.put<Cliente>(environment.baseUrl + 'client/changeStatus/' + empleado.codCliente, usuario);
      }

    delete2(usuario: Cliente): Observable<Cliente> {
    return this.http.delete<Cliente>(environment.baseUrl + 'client/delete/' + usuario.codCliente)
    }


    exportFile() {
      return this.http.post(`${environment.baseUrl}client/export-excel`, {}, {
        responseType: 'blob' // Indicar que la respuesta es un blob (archivo)
      });
    }
  
    
}
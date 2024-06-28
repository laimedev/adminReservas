import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { Observable } from 'rxjs';
import { User } from '../../entities/security/user';
import { PageRequest, Page } from 'src/app/utils/paginator/page-utils';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {


  public admin: any;
  mostrarAdmin = false;
  serSel: any;



  constructor(protected client: HttpClient) { }








  createUser(entity: User): Observable<User> {
    return this.client.post<User>(`${environment.baseUrl}admin`, entity)
  }

  // getById(user: User): Observable<User> {

  //   return this.client.get<User>(environment.baseUrl + '/security/users/' + user.id)
  // }

  editUser(user: User): Observable<User> {

    return this.client.put<User>(environment.baseUrl + '/security/users/' + user.id, user);
  }





  getAll(request: PageRequest<User>): Observable<Page<User>> {
    const params = new HttpParams().set('json', JSON.stringify(request));
    return this.client.get<Page<User>>(environment.baseUrl + '/security/users', { params })
  }

  getAllUser(request: PageRequest<User>): Observable<Page<User>> {
    const params = new HttpParams().set('json', JSON.stringify(request));
    return this.client.get<Page<User>>(environment.baseUrl + '/users', { params })
  }

  getAllUser2(): Observable<User[]> {
    return this.client.get<User[]>(environment.baseUrl + '/users');
  }



  // delete(user: User): Observable<User> {
  //   return this.client.delete<User>(environment.baseUrl + '/security/users/' + user.id)
  // }

  public export(filter: PageRequest<User>): Observable<any> {


    return this.client.post(`${environment.baseUrl}/security/export/user`, filter).pipe(map(function (data: any) {

      data.data.map(function (item: any) {

        delete item.emailr;
        delete item.commentUser;
        delete item.password;
        delete item.passwordr;
        delete item.area;
        delete item.company;
        delete item.roles;
        delete item.roleIds;
        delete item.updatedAt;
        delete item.deletedAt;
        delete item.admin;

        item.usuario= item.username;
        delete item.username;
        item.nombre= item.fullname;
        delete item.fullname;
        item.email2= item.email;
        delete item.email;
        item.email= item.email2;
        delete item.email2;
        item.telefono= item.cellphone;
        delete item.cellphone;
        item.estado= item.status;
        item.estado=  item.estado = 1 ? "Activo":"Inactivo";
        delete item.status;
        item.fecha_de_creacion= item.createdAt;
        delete item.createdAt;

       // return item;
      })
      return data;
    }))
  }












  // cargarUsuarios(desde: number = 0){
  //   const url = `${environment.baseUrl}admin?desde=${desde}`; 
  //   return this.client.get<any>(url)
  // }

  cargarAdministradores(desde: number = 0){
    const url = `${environment.baseUrl}admin?desde=${desde}`; 
    return this.client.get<any>(url, this.headers)
  }


  getById(admin: User): Observable<User> {
    return this.client.post<User>(environment.baseUrl + 'admin/showByID', {"_id": admin.id})
  }


  edit(admin: User): Observable<User> {
    return this.client.post<User>(environment.baseUrl + 'admin/update/' + admin.id, admin);
  }

  delete(admin: User): Observable<User> {
    return this.client.delete<User>(environment.baseUrl + 'admin/' + admin.id)
  }


  get token(): string {
    return localStorage.getItem('token') || '';
  }
  

  get id():string{
    return this.admin.id || '';
  }

  get role(): '0' | '1' | '2' {
    return this.admin.role;
  }

  get headers () {
    return{
        headers: {
        'x-token': this.token
    }
  }
  }



  exportar(): Observable<User> {
    return this.client.get<User>(environment.baseUrl + 'cargo/exportar')
  }

}

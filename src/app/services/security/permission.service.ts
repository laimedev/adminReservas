import { Injectable } from '@angular/core';
import { Permissions } from '../../entities/security/permissions';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';


import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(protected client: HttpClient) { }


  getPermissions(): Observable<Permissions[]> {

    return this.client.get<Permissions[]>(environment.baseUrl + '/security/permissions')


  //  return [
  //     { "id": 7, "parent": "2", "text": "Ver", "icon": "fa fa-eye" },
  //     { "id": 11, "parent": "3", "text": "Ver", "icon": "fa fa-eye" },
  //     { "id": 32, "parent": "18", "text": "Ver", "icon": "fa fa-eye" },
  //     { "id": 37, "parent": "19", "text": "Ver", "icon": "fa fa-eye" },
  //     { "id": 42, "parent": "20", "text": "Ver", "icon": "fa fa-eye" },
  //     { "id": 48, "parent": "21", "text": "Ver", "icon": "fa fa-eye" },
  //     { "id": 60, "parent": "22", "text": "Ver", "icon": "fa fa-eye" },
  //     { "id": 17, "parent": "#", "text": "Elementos de Red", "icon": "fa fa-file-text-o" },
  //     { "id": 18, "parent": "17", "text": "Equipos", "icon": "fa fa-server" },
  //     { "id": 25, "parent": "4", "text": "Vendor", "icon": "fa fa-building" },
  //     { "id": 1, "parent": "#", "text": "Administraci\u00f3n", "icon": "fa fa-lock" },
  //     { "id": 52, "parent": "21", "text": "Subir", "icon": "fa fa-upload" },
  //     { "id": 53, "parent": "18", "text": "Subir", "icon": "fa fa-upload" },
  //     { "id": 55, "parent": "19", "text": "Subir", "icon": "fa fa-upload" },
  //     { "id": 57, "parent": "20", "text": "Subir", "icon": "fa fa-upload" },
  //     { "id": 64, "parent": "22", "text": "Subir", "icon": "fa fa-upload" },
  //     { "id": 4, "parent": "1", "text": "Configuraci\u00f3n", "icon": "fa fa-lock" },
  //     { "id": 26, "parent": "4", "text": "Familia", "icon": "fa fa-users" },
  //     { "id": 19, "parent": "17", "text": "Puertos", "icon": "fa fa-plug" },
  //     { "id": 5, "parent": "2", "text": "Nuevo", "icon": "fa fa-plus-circle" },
  //     { "id": 9, "parent": "3", "text": "Nuevo", "icon": "fa fa-plus-circle" },
  //     { "id": 30, "parent": "18", "text": "Nuevo", "icon": "fa fa-plus-circle" },
  //     { "id": 40, "parent": "20", "text": "Nuevo", "icon": "fa fa-plus-circle" },
  //     { "id": 46, "parent": "21", "text": "Nuevo", "icon": "fa fa-plus-circle" },
  //     { "id": 58, "parent": "22", "text": "Nuevo", "icon": "fa fa-plus-circle" },
  //     { "id": 66, "parent": "23", "text": "Ver", "icon": "fa fa-eye" },
  //     { "id": 68, "parent": "24", "text": "Ver", "icon": "fa fa-eye" },
  //     { "id": 69, "parent": "25", "text": "Nuevo", "icon": "fa fa-plus-circle" },
  //     { "id": 74, "parent": "26", "text": "Nuevo", "icon": "fa fa-plus-circle" },
  //     { "id": 79, "parent": "27", "text": "Nuevo", "icon": "fa fa-plus-circle" },
  //     { "id": 84, "parent": "28", "text": "Nuevo", "icon": "fa fa-plus-circle" },
  //     { "id": 89, "parent": "29", "text": "Nuevo", "icon": "fa fa-plus-circle" },
  //     { "id": 27, "parent": "4", "text": "Modelo de Equipo", "icon": "fa fa-server" },
  //     { "id": 3, "parent": "1", "text": "Perfiles", "icon": "fa fa-user-plus" },
  //     { "id": 20, "parent": "17", "text": "Servicios", "icon": "fa fa-archive" },
  //     { "id": 15, "parent": "2", "text": "Buscar", "icon": "fa fa-binoculars" },
  //     { "id": 16, "parent": "3", "text": "Buscar", "icon": "fa fa-binoculars" },
  //     { "id": 35, "parent": "18", "text": "Buscar", "icon": "fa fa-binoculars" },
  //     { "id": 45, "parent": "20", "text": "Buscar", "icon": "fa fa-binoculars" },
  //     { "id": 51, "parent": "21", "text": "Buscar", "icon": "fa fa-binoculars" },
  //     { "id": 63, "parent": "22", "text": "Buscar", "icon": "fa fa-binoculars" },
  //     { "id": 72, "parent": "25", "text": "Buscar", "icon": "fa fa-binoculars" },
  //     { "id": 77, "parent": "26", "text": "Buscar", "icon": "fa fa-binoculars" },
  //     { "id": 82, "parent": "27", "text": "Buscar", "icon": "fa fa-binoculars" },
  //     { "id": 87, "parent": "28", "text": "Buscar", "icon": "fa fa-binoculars" },
  //     { "id": 92, "parent": "29", "text": "Buscar", "icon": "fa fa-binoculars" },
  //     { "id": 94, "parent": "19", "text": "Buscar", "icon": "fa fa-binoculars" },
  //     { "id": 95, "parent": "23", "text": "Buscar", "icon": "fa fa-binoculars" },
  //     { "id": 96, "parent": "24", "text": "Buscar", "icon": "fa fa-binoculars" },
  //     { "id": 28, "parent": "4", "text": "Modelo de Tarjeta", "icon": "fa fa-newspaper-o" },
  //     { "id": 21, "parent": "17", "text": "Clientes", "icon": "fa fa-users" },
  //     { "id": 2, "parent": "1", "text": "Usuarios", "icon": "fa fa-users" },
  //     { "id": 13, "parent": "2", "text": "Exportar", "icon": "fa fa-download" },
  //     { "id": 14, "parent": "3", "text": "Exportar", "icon": "fa fa-download" },
  //     { "id": 34, "parent": "18", "text": "Exportar", "icon": "fa fa-download" },
  //     { "id": 39, "parent": "19", "text": "Exportar", "icon": "fa fa-download" },
  //     { "id": 44, "parent": "20", "text": "Exportar", "icon": "fa fa-download" },
  //     { "id": 50, "parent": "21", "text": "Exportar", "icon": "fa fa-download" },
  //     { "id": 62, "parent": "22", "text": "Exportar", "icon": "fa fa-download" },
  //     { "id": 65, "parent": "23", "text": "Exportar", "icon": "fa fa-download" },
  //     { "id": 67, "parent": "24", "text": "Exportar", "icon": "fa fa-download" },
  //     { "id": 73, "parent": "25", "text": "Exportar", "icon": "fa fa-download" },
  //     { "id": 78, "parent": "26", "text": "Exportar", "icon": "fa fa-download" },
  //     { "id": 88, "parent": "28", "text": "Exportar", "icon": "fa fa-download" },
  //     { "id": 93, "parent": "29", "text": "Exportar", "icon": "fa fa-download" },
  //     { "id": 29, "parent": "4", "text": "Modelo de Sub Tarjeta", "icon": "fa fa-newspaper-o" },
  //     { "id": 22, "parent": "17", "text": "Categor\u00eda Servicios", "icon": "fa fa-suitcase" },
  //     { "id": 6, "parent": "2", "text": "Editar", "icon": "fa fa-pencil" },
  //     { "id": 10, "parent": "3", "text": "Editar", "icon": "fa fa-pencil" },
  //     { "id": 31, "parent": "18", "text": "Editar", "icon": "fa fa-pencil" },
  //     { "id": 36, "parent": "19", "text": "Editar", "icon": "fa fa-pencil" },
  //     { "id": 41, "parent": "20", "text": "Editar", "icon": "fa fa-pencil" },
  //     { "id": 47, "parent": "21", "text": "Editar", "icon": "fa fa-pencil" },
  //     { "id": 59, "parent": "22", "text": "Editar", "icon": "fa fa-pencil" },
  //     { "id": 70, "parent": "25", "text": "Editar", "icon": "fa fa-pencil" },
  //     { "id": 75, "parent": "26", "text": "Editar", "icon": "fa fa-pencil" },
  //     { "id": 80, "parent": "27", "text": "Editar", "icon": "fa fa-pencil" },
  //     { "id": 85, "parent": "28", "text": "Editar", "icon": "fa fa-pencil" },
  //     { "id": 90, "parent": "29", "text": "Editar", "icon": "fa fa-pencil" },
  //     { "id": 23, "parent": "17", "text": "Equipo\/Tarjeta\/Sub-Tarjeta\/Puertos", "icon": "fa fa-suitcase" },
  //     { "id": 8, "parent": "2", "text": "Borrar", "icon": "fa fa-trash" },
  //     { "id": 12, "parent": "3", "text": "Borrar", "icon": "fa fa-trash" },
  //     { "id": 33, "parent": "18", "text": "Borrar", "icon": "fa fa-trash" },
  //     { "id": 38, "parent": "19", "text": "Borrar", "icon": "fa fa-trash" },
  //     { "id": 43, "parent": "20", "text": "Borrar", "icon": "fa fa-trash" },
  //     { "id": 49, "parent": "21", "text": "Borrar", "icon": "fa fa-trash" },
  //     { "id": 61, "parent": "22", "text": "Borrar", "icon": "fa fa-trash" },
  //     { "id": 71, "parent": "25", "text": "Borrar", "icon": "fa fa-trash" },
  //     { "id": 76, "parent": "26", "text": "Borrar", "icon": "fa fa-trash" },
  //     { "id": 81, "parent": "27", "text": "Borrar", "icon": "fa fa-trash" },
  //     { "id": 86, "parent": "28", "text": "Borrar", "icon": "fa fa-trash" },
  //     { "id": 91, "parent": "29", "text": "Borrar", "icon": "fa fa-trash" },
  //     { "id": 24, "parent": "17", "text": "Cliente\/Servicio\/Puerto", "icon": "fa fa-tasks" },
  //     { "id": 54, "parent": "18", "text": "Sync", "icon": "fa fa-history" },
  //     { "id": 56, "parent": "19", "text": "Sync", "icon": "fa fa-history" },
  //     { "id": 83, "parent": "27", "text": "Export", "icon": "fa fa-download" }
  //   ]
  }
}

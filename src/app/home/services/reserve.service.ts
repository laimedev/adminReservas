import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReserveService {

  apiUrl: string = environment.baseUrl; 


  constructor(private http: HttpClient) { }


  getSucursal(): Observable<any> {
    return this.http.get(`${this.apiUrl}sucursal/list`)
  }


  getClientes(searchTerm?: any): Observable<any> {
    // return this.http.get(`${this.apiUrl}client/listSelect`)
    // Construir la URL de la solicitud
    let url = `${this.apiUrl}client/listSelect`;
    // Si se proporciona codSucursal, añadirlo a la URL como parámetro de consulta
    if (searchTerm) {
      url += `?searchTerm=${searchTerm}`;
    }
    // Realizar la solicitud HTTP GET
    return this.http.get(url);
    
  }

  getLocalidad(codSucursal?: any): Observable<any> {
    // Construir la URL de la solicitud
    let url = `${this.apiUrl}localidades/list`;
    // Si se proporciona codSucursal, añadirlo a la URL como parámetro de consulta
    if (codSucursal) {
      url += `?codSucursal=${codSucursal}`;
    }
    // Realizar la solicitud HTTP GET
    return this.http.get(url);
  }

  obetenerReservas(localidadSelect: any): Observable<any>{
    return this.http.get(`${this.apiUrl}registro-cliente/listar/?id=${localidadSelect}`)
  }

  

  searchReserva(formData: any){
    return this.http.post(`${this.apiUrl}reporte/search-reserva`, formData)
  }

  searchReservaByID(formData: any){
    return this.http.post(`${this.apiUrl}reporte/search-reserva-id`, formData)
  }

  

}

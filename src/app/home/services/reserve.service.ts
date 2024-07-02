import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,  of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { delay, switchMap } from 'rxjs/operators';


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

  

  // getCliente(): Observable<any> {
  //   let url = `${this.apiUrl}client/listSelect`;
  //   return this.http.get(url);
  // }

  getCliente(): Observable<any[]> {
    let url = `${this.apiUrl}client/listSelect`;
    return this.http.get<any[]>(url);
  }



  getPeople(term: any = null): Observable<any[]> {
    return this.getCliente().pipe(
      switchMap((items: any) => {
        console.log('awa', items)
        // const data =  items['data']
        if (term) {
          items = items.filter((x: any) => x.name.toLowerCase().includes(term.toLowerCase()));
          console.log('capii ', items)
        }
        console.log(items)
        return of(items.data); // Asegúrate de devolver un array
      }),
      delay(500)
    );
  }
  

  


}





function getMockPeople() {
	return [
		{
			id: '5a15b13c36e7a7f00cf0d7cb',
			index: 2,
			isActive: true,
			picture: 'http://placehold.it/32x32',
			age: 23,
			name: 'Karyn Wright',
			gender: 'female',
			company: 'ZOLAR',
			email: 'karynwright@zolar.com',
			phone: '+1 (851) 583-2547',
		},
		{
			id: '5a15b13c2340978ec3d2c0ea',
			index: 3,
			isActive: false,
			picture: 'http://placehold.it/32x32',
			age: 35,
			name: 'Rochelle Estes',
			disabled: true,
			gender: 'female',
			company: 'EXTRAWEAR',
			email: 'rochelleestes@extrawear.com',
			phone: '+1 (849) 408-2029',
		},
		{
			id: '5a15b13c663ea0af9ad0dae8',
			index: 4,
			isActive: false,
			picture: 'http://placehold.it/32x32',
			age: 25,
			name: 'Mendoza Ruiz',
			gender: 'male',
			company: 'ZYTRAX',
			email: 'mendozaruiz@zytrax.com',
			phone: '+1 (904) 536-2020',
		}
	];
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Menu } from 'src/app/entities/menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(protected client: HttpClient) { }

  getMenu(): Observable<Menu[]> {
    return this.client.get<Menu[]>(environment.baseUrl + '/page/menu')
  }

  getMenuJSON(): Observable<Menu[]> {
    return this.client.get<Menu[]>('assets/menu.json')
  }

  getMenuJSONStaff(): Observable<Menu[]> {
    return this.client.get<Menu[]>('assets/menu_staff.json')
  }

  getMenuJSONPersonal(): Observable<Menu[]> {
    return this.client.get<Menu[]>('assets/menu_personal.json')
  }

}


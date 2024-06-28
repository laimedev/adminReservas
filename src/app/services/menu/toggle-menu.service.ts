import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToggleMenuService {

  private subject$: Subject<boolean> = new Subject<boolean>()

  constructor() { }


  get observable(): Observable<boolean> {
    return this.subject$.asObservable()
  }

  toggleMenu() {
    this.subject$.next(false)
  }
}

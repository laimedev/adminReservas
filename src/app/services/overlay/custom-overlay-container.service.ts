import { Injectable } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';


@Injectable({
  providedIn: 'root'
})
export class CustomOverlayContainerService extends OverlayContainer {

  /**
   * Better to use parent constructor
   * @Constructor
   */


  public setContainer(containerElement: HTMLElement): void {
    this._containerElement = containerElement;
  }
  
}

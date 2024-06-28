import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[noKeyEventsHere]'
})
export class NoKeyEventsDirective {

  constructor(el: ElementRef) { }

  @HostListener('keyup', ['$event'])
  onKeyUp(event: KeyboardEvent) {
    console.log("tmr");
    event.preventDefault();
    event.stopPropagation();
  }
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    event.preventDefault();
    event.stopPropagation();
  }
  @HostListener('keypress', ['$event'])
  onKeyPress(event: KeyboardEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

}
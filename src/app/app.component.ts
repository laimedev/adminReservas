import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ToggleMenuService } from './services/menu/toggle-menu.service'
import { from } from 'rxjs';

declare var $: any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild('page_container')
  sidebarContainer: ElementRef = new ElementRef(null);

  constructor(private toggleMenuService: ToggleMenuService) { }

  ngOnInit(): void {

    this.toggleMenuService.observable.subscribe((value: boolean) => {
      this.toggleMenu()
    })


    $("#ctm").click((e: any) => {
      e.preventDefault()
      console.log("ctm")
    });
  }

  toggleMenu() {

    if (this.sidebarContainer.nativeElement.classList.contains('open-sidebar')) {
      this.sidebarContainer.nativeElement.classList.remove('open-sidebar')
    } else {
      this.sidebarContainer.nativeElement.classList.add('open-sidebar')
    }
  }


  title = 'atp-certificaciones';


}

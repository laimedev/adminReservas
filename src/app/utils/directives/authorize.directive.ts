import { Directive, ElementRef, ViewContainerRef, TemplateRef, Input, OnInit } from '@angular/core';
import { SessionStorageService } from 'src/app/services/session-storage.service';


/**
 * Simple Directive to ckeck if any anthenticated user is Authorized (Inspired by Thymeleaf + Spring Security integration)
 * @author ManuelCD  2019
 * 
 */

@Directive({
  selector: '[authorize]'
})
export class AuthorizeDirective implements OnInit {

  @Input('authorize') permission: any

  constructor(
    private templateRef: TemplateRef<any>, 
    private containerRef: ViewContainerRef, 
    private sessionService: SessionStorageService) {
    
   }
  ngOnInit(): void {
    if (this.sessionService.getAuthorities().includes(this.permission)) {
      this.containerRef.createEmbeddedView(this.templateRef)
    } else {
      this.containerRef.clear()
    }
  }
}

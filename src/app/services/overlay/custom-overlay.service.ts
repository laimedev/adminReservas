// import { Injectable, ComponentFactoryResolver, Injector, NgZone, Inject, RendererFactory2, Renderer2 } from '@angular/core';
// import { Overlay, ScrollStrategyOptions, OverlayContainer, OverlayPositionBuilder, OverlayKeyboardDispatcher, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
// import { Directionality } from '@angular/cdk/bidi';

// import { CustomOverlayContainerService } from './custom-overlay-container.service'
// import { DOCUMENT } from '@angular/common';
// import { ComponentPortal } from '@angular/cdk/portal';
// import { LoadingOverlayComponent } from 'src/app/utils/components/loading-overlay/loading-overlay.component';

// @Injectable({
//   providedIn: 'root'
// })
// export class CustomOverlayService extends Overlay {

//   /**
//    * Local
//    */
//   protected customContainer: CustomOverlayContainerService
//   protected overlayRef: OverlayRef

//   constructor(
//     scrollStrategies: ScrollStrategyOptions,
//     _overlayContainer: CustomOverlayContainerService,
//     _componentFactoryResolver: ComponentFactoryResolver,
//     _positionBuilder: OverlayPositionBuilder,
//     _keyboardDispatcher: OverlayKeyboardDispatcher,
//     _injector: Injector,
//     _ngZone: NgZone,
//     @Inject(DOCUMENT) _document: any,
//     _directionality: Directionality,
//     rendererFactory: RendererFactory2
//   ) {
//     super(
//       scrollStrategies,
//       _overlayContainer,
//       _componentFactoryResolver,
//       _positionBuilder,
//       _keyboardDispatcher,
//       _injector,
//       _ngZone,
//       _document,
//       _directionality
//     );
//     //this.renderer = rendererFactory.createRenderer(null, null);

//     this.customContainer = _overlayContainer;


//   }

//   openOverlay() {    this.overlayRef.attach(new ComponentPortal(LoadingOverlayComponent));  }
//   closeOverlay() {this.overlayRef.detach()}

//   CustomCreate(el: HTMLElement) {
//     el.style.transform = 'translateZ(0)';
//     //this.renderer.setStyle(el, 'transform', 'translateZ(0)');
//     this.customContainer.setContainer(el)
//     this.overlayRef = super.create({
//       positionStrategy: this.position()
//         .global()
//         .centerHorizontally()
//         .centerVertically(),
//       hasBackdrop: true,
//       backdropClass: ''
//     });

//   }




// }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoKeyEventsDirective } from './directives/no-key-events.directive';
import { ServerResponseFormComponent } from './components/server-response-form/server-response-form.component';
import { AuthorizeDirective } from '../utils/directives/authorize.directive';
import { LoadingOverlayComponent } from './components/loading-overlay/loading-overlay.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';



@NgModule({
  declarations: [NoKeyEventsDirective, ServerResponseFormComponent, AuthorizeDirective, LoadingOverlayComponent],
  imports: [
    CommonModule,
    MatProgressBarModule,
  ],
  exports: [
    NoKeyEventsDirective,
    ServerResponseFormComponent,
    AuthorizeDirective

  ],
  entryComponents: [
    LoadingOverlayComponent
  ]
})
export class UtilsModule { }

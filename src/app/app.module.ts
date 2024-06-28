import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HomeModule} from './home/home.module'
import {LoginModule} from './login/login.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {JwtTokenInterceptor} from './services/interceptors/jwt-token-interceptor'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UtilsModule } from './utils/utils.module';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ChartsModule } from 'ng2-charts';

import { FullCalendarModule } from '@fullcalendar/angular';
import { UserModule } from './administracion/users/user.module';
import { ClientModule } from './administracion/clients/client.module';
import { SucursalesModule } from './settings/sucursales/sucursales.module';
import { CamposModule } from './settings/campos/campos.module';
import { ProfileModule } from './settings/profile/profile.module';
import { AjustesModule } from './settings/ajustes/ajustes.module';
import { ReportsModule } from './reports/reports.module';


// import pdfFonts from "pdfmake/build/vfs_fonts";
// Set the fonts to use
// import pdfFonts from "pdfmake/build/vfs_fonts";
import { PdfMakeWrapper } from 'pdfmake-wrapper';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
PdfMakeWrapper.setFonts(pdfFonts);



@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    LoginModule,
    BrowserAnimationsModule,
    NgbModule,
    HttpClientModule,
    UtilsModule,
    ChartsModule,
    UserModule,
    ClientModule,
    ReportsModule,
    SucursalesModule,
    CamposModule,
    ProfileModule,
    AjustesModule,

    FullCalendarModule
  ],
  providers: [
    Title,
    // { provide: HTTP_INTERCEPTORS, useClass: JwtTokenInterceptor, multi: true },
    {provide: LocationStrategy, useClass: HashLocationStrategy,}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

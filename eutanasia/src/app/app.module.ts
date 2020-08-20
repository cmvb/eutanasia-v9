// Imports PrimeNG
import { DialogModule } from 'primeng/dialog';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ToastModule } from 'primeng/toast';
import { GMapModule } from 'primeng/gmap';
import { GalleriaModule } from 'primeng/galleria';
import { ButtonModule } from 'primeng/button';
import { SliderModule } from 'primeng/slider';

// Imports Utilidades
import { TextProperties } from './config/TextProperties';
import { Functions } from './config/Functions';
import { Util } from './config/Util';
import { GoogleMapsModule } from '@angular/google-maps'
import { AgmCoreModule } from '@agm/core';
import { CarouselModule } from 'ngx-owl-carousel-o';

// Imports Esenciales
import { AppRoutingModule } from './config/Routing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgxUiLoaderConfig, NgxUiLoaderHttpModule, NgxUiLoaderModule, NgxUiLoaderRouterModule } from 'ngx-ui-loader';

// Imports Componentes
import { AppComponent } from './app.component';
import { Guardian } from './config/Guardian';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BlogComponent } from './components/blog/blog.component';

// Imports Componentes Internos
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { Enumerados } from './config/Enumerados';
import { ObjectModelInitializer } from './config/ObjectModelInitializer';
import { MessageService } from 'primeng/api';
import { SesionService } from './services/sesionService/sesion.service';

// Constantes
const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  "bgsColor": "#fff",
  "bgsOpacity": 0.5,
  "bgsPosition": "bottom-right",
  "bgsSize": 60,
  "bgsType": "three-strings",
  "blur": 5,
  "fgsColor": "#fff",
  "fgsPosition": "center-center",
  "fgsSize": 180,
  "fgsType": "three-strings",
  "gap": 24,
  "logoPosition": "center-center",
  "logoSize": 40,
  "masterLoaderId": "master",
  "overlayBorderRadius": "0",
  "overlayColor": "rgba(40, 40, 40, 0.8)",
  "pbColor": "#761e0e",
  "pbDirection": "ltr",
  "pbThickness": 3,
  "hasProgressBar": true,
  "text": "",
  "textColor": "#FFFFFF",
  "textPosition": "center-center"
};


// Componentes
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    BlogComponent
  ],
  imports: [
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyBaNBQN5zBRz7h5lUKB4GGZQHhakKrajSA' }),
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    GoogleMapsModule,
    HttpModule,
    HttpClientModule,
    RouterModule,

    CarouselModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderRouterModule,
    NgxUiLoaderHttpModule.forRoot({ showForeground: true }),
    MessagesModule,
    MessageModule,
    ToastModule,
    GMapModule,
    ScrollPanelModule,
    GalleriaModule,
    ButtonModule,
    SliderModule,
    DialogModule
  ],
  providers: [TextProperties, Enumerados, ObjectModelInitializer, Guardian, Util, Functions, MessageService, SesionService, { provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
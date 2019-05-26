import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, RouteReuseStrategy, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

import {IonicModule, IonicRouteStrategy, NavController} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';

import {ServiceWorkerModule} from '@angular/service-worker';
import {AngularFireModule} from '@angular/fire';
import {AngularFireMessagingModule} from '@angular/fire/messaging';

import {environment} from '../environments/environment';

import {SocketIoModule, SocketIoConfig} from 'ng-socket-io';
import { ToastController} from "ionic-angular";
import {ParamServiceService} from "./param-service.service";

const config: SocketIoConfig = {url: 'http://localhost:3001', options: {}};


@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        HttpClientModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        SocketIoModule.forRoot(config),
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireMessagingModule,
        ServiceWorkerModule.register('combined-sw.js', {enabled: environment.production})
        // ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
    ],
    providers: [
        StatusBar,
        SplashScreen,
        ToastController,
        ParamServiceService,
        NavController,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

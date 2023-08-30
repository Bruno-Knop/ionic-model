import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {
  enableProdMode,
  importProvidersFrom,
  isDevMode,
  LOCALE_ID,
} from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter, RouteReuseStrategy } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { MessageService } from 'primeng/api';
import { MaskDirective } from './app/directives/Mask.directive';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { InterceptorService } from './app/Services/authentication/interceptor.service';
import { ControllService } from './app/Services/controller.service';
import { StorageService } from './app/Services/storageService.service';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    Network,
    MaskDirective,
    ControllService,
    StorageService,
    MessageService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    importProvidersFrom(
      BrowserAnimationsModule,
      HttpClientModule,
      IonicModule.forRoot({}),
      IonicStorageModule.forRoot(),
      ServiceWorkerModule.register('ngsw-worker.js', {
        enabled: !isDevMode(),
        registrationStrategy: 'registerWhenStable:30000',
      })
    ),
    provideRouter(routes),
  ],
});

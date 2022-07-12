import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { FirstPage } from '../app/pages/first/first.page';
import { SecondPage } from '../app/pages/second/second.page';
import {RecordBedtimePage} from '../app/pages/record-bedtime/record-bedtime.page';


@NgModule({
  declarations: [AppComponent,FirstPage,SecondPage,RecordBedtimePage],
  entryComponents: [FirstPage,SecondPage,RecordBedtimePage],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BedtimePageRoutingModule } from './bedtime-routing.module';

import { BedtimePage } from './bedtime.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BedtimePageRoutingModule
  ],
  declarations: [BedtimePage]
})
export class BedtimePageModule {}

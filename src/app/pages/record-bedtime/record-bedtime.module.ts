import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecordBedtimePageRoutingModule } from './record-bedtime-routing.module';

import { RecordBedtimePage } from './record-bedtime.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecordBedtimePageRoutingModule
  ],
  declarations: [RecordBedtimePage]
})
export class RecordBedtimePageModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecordBedtimePage } from './record-bedtime.page';

const routes: Routes = [
  {
    path: '',
    component: RecordBedtimePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecordBedtimePageRoutingModule {}

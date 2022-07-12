import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BedtimePage } from './bedtime.page';

const routes: Routes = [
  {
    path: '',
    component: BedtimePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BedtimePageRoutingModule {}

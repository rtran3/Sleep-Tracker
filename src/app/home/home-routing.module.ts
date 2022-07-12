import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: HomePage,
    children: [
      {
        path:'bedtime',
        children: [
          {
            path:'',
            loadChildren: () => import('../pages/bedtime/bedtime.module').then( m => m.BedtimePageModule)
          }

        ]
      },
      {
        path:'sleepiness',
        children: [
          {
            path:'',
            loadChildren: () => import('../pages/sleepiness/sleepiness.module').then( m => m.SleepinessPageModule)
          }

        ]
      },
      {
        path:'',
        redirectTo: '/tabs/bedtime',
        pathMatch:'full'
      }
    ]
  },
  {
    path:'',
    redirectTo: '/tabs/bedtime',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}

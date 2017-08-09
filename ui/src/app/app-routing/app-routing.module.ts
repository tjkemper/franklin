import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from '../home/home.component';
import { StatsComponent } from '../stats/stats.component';
import { TotalStatsComponent } from '../total-stats/total-stats.component';
import { WeekStatsComponent } from '../week-stats/week-stats.component';
import { AboutComponent } from '../about/about.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'stats', component: StatsComponent,
    children: [
      { path: '', component: TotalStatsComponent }
    ] 
  },
  { path: 'about', component: AboutComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }

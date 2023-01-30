import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidatesComponent } from './candidates/candidates.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PartiesComponent } from './parties/parties.component';
import { TablesComponent } from './tables/tables.component';

const routes: Routes = [
  {
    path: 'candidatos',
    component: CandidatesComponent
  },
  {
    path: 'partidos',
    component: PartiesComponent
  },
  {
    path: 'mesas',
    component: TablesComponent
  },
  {
    path: 'general',
    component: DashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }

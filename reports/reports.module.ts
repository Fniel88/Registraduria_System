import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { CandidatesComponent } from './candidates/candidates.component';
import { PartiesComponent } from './parties/parties.component';
import { TablesComponent } from './tables/tables.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NbCardModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CandidatesComponent,
    PartiesComponent,
    TablesComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    NbCardModule,
    FormsModule
  ]
})
export class ReportsModule { }

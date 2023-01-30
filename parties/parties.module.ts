import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartiesRoutingModule } from './parties-routing.module';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { NbCardModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    PartiesRoutingModule,
    NbCardModule,
    FormsModule
  ]
})
export class PartiesModule { }

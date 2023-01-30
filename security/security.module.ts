import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecurityRoutingModule } from './security-routing.module';
import { LoginComponent } from './login/login.component';
import { NbCardModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    SecurityRoutingModule,
    NbCardModule,
    FormsModule
  ]
})
export class SecurityModule {}

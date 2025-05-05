import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { CarOwnerDashboardComponent } from './car-owner-dashboard/car-owner-dashboard.component';
import {AdminDashboardComponent} from './admin-dashboard/admin-dashboard.component';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component'
import {ReactiveFormsModule, FormsModule} from '@angular/forms'
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DatePipe } from '@angular/common';

@NgModule({
  providers:[DatePipe],
  declarations: [
    CarOwnerDashboardComponent,
    AdminDashboardComponent,
    CustomerDashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ModalModule,
    ReactiveFormsModule, FormsModule,
    BsDatepickerModule.forRoot(),

  ]
})
export class DashboardModule { }

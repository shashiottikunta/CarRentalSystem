import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import {ReactiveFormsModule, FormsModule} from '@angular/forms'

import { AllListRoutingModule } from './all-list-routing.module';
import { AllCustomersListComponent } from './all-customers-list/all-customers-list.component';
import { AllCarownerListComponent } from './all-carowner-list/all-carowner-list.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CurrentBookingsComponent } from './current-bookings/current-bookings.component';
import { PreviousBookingsComponent } from './previous-bookings/previous-bookings.component';


@NgModule({
  providers:[DatePipe],
  declarations: [
    AllCustomersListComponent,
    AllCarownerListComponent,
    CurrentBookingsComponent,
    PreviousBookingsComponent
  ],
  imports: [
    CommonModule,
    AllListRoutingModule,
    PaginationModule.forRoot(),
    NgbModule,
    ModalModule,
    ReactiveFormsModule, FormsModule


  ]
})
export class AllListModule { }

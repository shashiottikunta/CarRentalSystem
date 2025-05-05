import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllCustomersListComponent } from './all-customers-list/all-customers-list.component';
import { AllCarownerListComponent } from './all-carowner-list/all-carowner-list.component';
import { CurrentBookingsComponent } from './current-bookings/current-bookings.component';
import { PreviousBookingsComponent } from './previous-bookings/previous-bookings.component';

const routes: Routes = [
  { path: 'allCutomerList', component: AllCustomersListComponent },
  { path: 'allCarownerList', component: AllCarownerListComponent },
  { path: 'currentList', component: CurrentBookingsComponent },
  { path: 'previousList', component: PreviousBookingsComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllListRoutingModule { }

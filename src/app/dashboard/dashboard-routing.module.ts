import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarOwnerDashboardComponent } from './car-owner-dashboard/car-owner-dashboard.component';
import {AdminDashboardComponent} from './admin-dashboard/admin-dashboard.component'
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component'

const routes: Routes = [{path:'carOwner-dashboard',component:CarOwnerDashboardComponent},
{path:'admin-dashboard',component:AdminDashboardComponent},
{path:'customer-dashboard',component:CustomerDashboardComponent},
{path:'carowner-dashboard',component:CarOwnerDashboardComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AddCarComponent } from './add-car/add-car.component';
import { CarsListComponent } from './cars-list/cars-list.component';
import { NewDashboardComponent } from './new-dashboard/new-dashboard.component';

const routes: Routes = [
  // { path: '', redirectTo: 'login', pathMatch: 'full' },
  // { path: 'login', component: LoginComponent },
  // { path: 'signup', component: SignUpComponent },
  { path: 'dashboard', component: NewDashboardComponent },




  // {
  //   path: '',
  //   component: LayoutComponent,
  //   children: [

  //     {
  //       path: '',
  //       loadChildren: () => import('./profile/profile.module')
  //         .then(user => user.ProfileModule),
  //     },
  //     {
  //       path: '',
  //       loadChildren: () => import('./dashboard/dashboard.module')
  //         .then(user => user.DashboardModule),
  //     },
  //     {
  //       path: '',
  //       loadChildren: () => import('./all-list/all-list.module')
  //         .then(user => user.AllListModule),
  //     },
  //     { path: 'addcar', component: AddCarComponent },

  //     { path: 'car-list', component: CarsListComponent },

  //   ]



  // }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

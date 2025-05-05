import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HttpInterceptorService } from './core/interceptors/http.interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AddCarComponent } from './add-car/add-car.component';
import { CarsListComponent } from './cars-list/cars-list.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NewDashboardComponent } from './new-dashboard/new-dashboard.component';
import { NgApexchartsModule } from 'ng-apexcharts';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    LayoutComponent,
    LoginComponent,
    SignUpComponent,
    AddCarComponent,
    CarsListComponent,
    NewDashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule, 
    FormsModule,
    NgbModule,
    TabsModule,
    HttpClientModule,
    NgApexchartsModule,
    ToastrModule.forRoot(
    ),
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,
    PaginationModule.forRoot() ,
    ModalModule,
    TooltipModule.forRoot(),

   ],
  providers: [
    // {
		// 	provide: HTTP_INTERCEPTORS,
		// 	useClass: HttpInterceptorService,
		// 	multi: true
		// },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

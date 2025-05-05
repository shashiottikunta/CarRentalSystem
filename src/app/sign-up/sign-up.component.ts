import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../services/http-service/http.service';
import { NotificationService } from '../services/notification-service/notification.service';
import { getLocalTime } from '../shared/utils/utils';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
signUpForm:FormGroup;
roleList:any;
genderList =['Female','Male']

  constructor( private fb:FormBuilder, private httpservice:HttpService, 
    private notification:NotificationService, private readonly router: Router) {
    this.signUpForm =this.fb.group({
      firstName:[''],
      middleName:[''],
      lastName:[''],
      role:[''],
      email:[''],
      phoneNumber:[''],
      altPhoneNumber:[''],
      dateOfBirth:[''],
      gender:[''],
      addLine1:[''],
      addLine2:[''],
      country:[''],
      state:[''],
      city:[''],
      zipcode:[''],
      password:[''],
      conformPassword:['']
    })
   }

  ngOnInit(): void {
    this.getRolesList()

  }
  getRolesList(){
    this.httpservice.doGet('roles').subscribe((res)=>{
      this.roleList = res?.roles;

    })
  }
  submit(){
    let form = this.signUpForm.value
    let payload ={
      "email": form.email,
      "password": form.password,
      "first_name": form.firstName,
      "middle_name": form.middleName,
      "last_name": form.lastName,
      "primary_phone_number": form.phoneNumber,
      "secondary_phone_number": form.altPhoneNumber,
      "gender": form.gender,
      "dob": getLocalTime(form.dateOfBirth),
      "role_id": form.role,
      "addressline1": form.addLine1,
      "addressline2": form.addLine2,
      "city": form.city,
      "state": form.state,
      "country": form.country,
      "zipcode": form.zipcode
    }
    this.httpservice.doPost('signup',payload).subscribe((res)=>{
      if(res){
        this.notification.showSucessNotification('', res.message)
        this.router.navigate(['/login']);
      }


    })
  }

}

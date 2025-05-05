import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpService } from 'src/app/services/http-service/http.service';
import { NotificationService } from 'src/app/services/notification-service/notification.service';
import { getLocalTime } from 'src/app/shared/utils/utils';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  roleList:any;
  signUpForm:FormGroup;
  genderList =['Female','Male']
  personalData:any;
  bsInlineValue = new Date;

  constructor(private fb:FormBuilder, private httpservice:HttpService, private notification:NotificationService) {
    this.signUpForm = this.fb.group({
      id:null,
      firstName:[''],
      middleName:[''],
      lastName:[''],
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
    this.getRolesList();
    this.getPersonalData();
  }
  getPersonalData(){
    this.httpservice.doGet(`user/${localStorage.getItem('userId')}`).subscribe((res)=>{
      this.personalData = res;
      this.bindData();
    })

  }
  bindData(){
    this.bsInlineValue = new Date(this.personalData?.dob)
    this.signUpForm.patchValue({
      id: this.personalData?.id,
      firstName: this.personalData?.first_name,
      middleName: this.personalData?.middle_name,
      lastName: this.personalData?.last_name,
      email: this.personalData?.email_id,
      phoneNumber: this.personalData?.primary_phone_number,
      altPhoneNumber: this.personalData?.secondary_phone_number,
      dateOfBirth: this.personalData?.dob,
      gender: this.personalData?.gender,
      addLine1: this.personalData?.addressline1,
      addLine2: this.personalData?.addressline2,
      country: this.personalData?.country,
      state: this.personalData?.state,
      city: this.personalData?.city,
      zipcode: this.personalData?.zipcode
    })
  }
  getRolesList(){
    this.httpservice.doGet('roles').subscribe((res)=>{
      this.roleList = res?.roles;
    })
  }
  submit(){
    let form = this.signUpForm.value
    let payload ={
      "id":form.id,
      "first_name": form.firstName,
      "middle_name": form.middleName,
      "last_name": form.lastName,
      "primary_phone_number": form.phoneNumber,
      "secondary_phone_number": form.altPhoneNumber,
      "gender": form.gender,
      "dob": getLocalTime(form.dateOfBirth),
      "addressline1": form.addLine1,
      "addressline2": form.addLine2,
      "city": form.city,
      "state": form.state,
      "country": form.country,
      "zipcode": form.zipcode
    }
    this.httpservice.doUpdate('update_user_details',payload).subscribe((res)=>{
      if(res){
        this.notification.showSucessNotification('',res.message)
      }else{
        this.notification.showSucessNotification('', 'Please check details')

      }

    })
    console.log(payload)
  }

}

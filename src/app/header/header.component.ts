import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../services/http-service/http.service';
import { NotificationService } from '../services/notification-service/notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  name:any;
  submitted = false;

  @ViewChild('changePassowrdData') changePasswordModal:any;
  changePasswordForm:FormGroup;

  constructor( private fb:FormBuilder,  private httpservice:HttpService,private readonly router: Router, private notification:NotificationService) {
    this.name =localStorage.getItem('userName')

    this.changePasswordForm = this.fb.group({
      currentPassword:['', Validators.required],
      newPassword:['', Validators.required]
    })

   }
   showModal(){
    this.changePasswordModal.show();
   }
   hideModal(){
    this.changePasswordModal.hide();
   }

  ngOnInit(): void {
  }
  submit(){
    let payload={
      current_password:this.changePasswordForm.get('currentPassword')?.value,
      new_password:this.changePasswordForm.get('newPassword')?.value
    }
    this.httpservice.doPost('changePassword', payload).subscribe((result)=>{
      if(result?.errorMessage){
        this.notification.showErrorNotification('', result.errorMessage)
      }else{
        this.notification.showSucessNotification('', result.message)
        this.hideModal();
        this.changePasswordForm.reset();
        

      }
    })

  }

}

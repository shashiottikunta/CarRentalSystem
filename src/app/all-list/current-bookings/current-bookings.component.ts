import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { HttpService } from 'src/app/services/http-service/http.service';
import { NotificationService } from 'src/app/services/notification-service/notification.service';

@Component({
  selector: 'app-current-bookings',
  templateUrl: './current-bookings.component.html',
  styleUrls: ['./current-bookings.component.css']
})
export class CurrentBookingsComponent implements OnInit {
  carList:any;
  @ViewChild('data') modal:any;
  form:FormGroup;
  constructor(private fb:FormBuilder, private piper:DatePipe, private httpservice:HttpService, private notification:NotificationService,
    private sanitizer: DomSanitizer){
      this.form = this.fb.group({
        comments:[''],
       
      })
    }
  
  
    ngOnInit(): void {
    this.httpservice.doGet(`customer_previous_rides/${localStorage.getItem('userId')}`).subscribe((res:any)=>{
      this.carList = res;

    })
  }

      
getImageUrl(imageData: string): SafeUrl {
  const binaryString = window.atob(imageData);
  const blob = new Blob([new Uint8Array(this.stringToArrayBuffer(binaryString))], { type: 'image/jpeg' });
  const imageUrl = URL.createObjectURL(blob);
  return this.sanitizer.bypassSecurityTrustUrl(imageUrl); // Wrap the URL in a SafeUrl object
}

private stringToArrayBuffer(binaryString: string): ArrayBuffer {
  const length = binaryString.length;
  const buffer = new ArrayBuffer(length);
  const array = new Uint8Array(buffer);
  for (let i = 0; i < length; i++) {
    array[i] = binaryString.charCodeAt(i);
  }
  return buffer;
}
submit(){
let payload ={
  comments:'',
  id:localStorage.getItem('userId')
}
this.httpservice.doUpdate('cancel_ride',payload).subscribe((res:any)=>{
  if(res){
    this.notification.showSucessNotification('',res.message)
  }else{
    this.notification.showSucessNotification('', 'Please check details')

  }
})
}

showModal(){
  this.modal.show();
 
 }
 hideModal(){
  this.modal.hide();
  this.form.reset();
 }

}

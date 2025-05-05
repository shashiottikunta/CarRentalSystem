import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { HttpService } from 'src/app/services/http-service/http.service';
import { NotificationService } from 'src/app/services/notification-service/notification.service';

@Component({
  selector: 'app-previous-bookings',
  templateUrl: './previous-bookings.component.html',
  styleUrls: ['./previous-bookings.component.css']
})
export class PreviousBookingsComponent implements OnInit {
  carList:any;
  constructor(private fb:FormBuilder, private piper:DatePipe, private httpservice:HttpService, private notification:NotificationService,
    private sanitizer: DomSanitizer) { }

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

}

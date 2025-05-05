import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpService } from 'src/app/services/http-service/http.service';
import { NotificationService } from 'src/app/services/notification-service/notification.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css']
})
export class CustomerDashboardComponent implements OnInit {
  form:FormGroup;
  carList:any;
  @ViewChild('data') modal:any;
  details:any
  numDays:number = 0;
  totalCost:number =0;

  submitted:Boolean= false;
  constructor(private fb:FormBuilder, private piper:DatePipe, private httpservice:HttpService, private notification:NotificationService,
    private sanitizer: DomSanitizer,) { 
    this.form = this.fb.group({
      startDate:[''],
      endDate:['']
    })
  }
  showModal(data:any){
    this.modal.show();
    this.details = data;
   }
   hideModal(){
    this.modal.hide();
    this.form.reset();
   }
  getDates(dates: any, price: any) {
    const startDate: Date = new Date(dates?.startDate);
    const endDate: Date = new Date(dates?.endDate);
    console.log(startDate, endDate)
    const pricePerDay: number = price;
    console.log(pricePerDay)
     const timeDiff = endDate.getTime() - startDate.getTime();
    this.numDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); // convert time difference to number of days
   
    this.totalCost = this.numDays * pricePerDay;
    console.log(this.totalCost)
    console.log(`The cost of the rental is $${this.totalCost}.`);
   }

  ngOnInit(): void {
    this.httpservice.doGet('all_cars').subscribe((res:any)=>{
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
      "customer_id": localStorage.getItem('userId'),
      "car_owner_id":this.details?.owner_id,
      "car_id":  this.details?.id,
      "start_date":  this.piper.transform(this.form.get('startDate')?.value, 'yyyy-MM-dd'),
      "end_date":  this.piper.transform(this.form.get('endDate')?.value,'yyyy-MM-dd'),
      "days":  this.numDays,
      "amount_earned": this.totalCost
    }
    this.httpservice.doPost('book_ride', payload).subscribe((res:any) =>{
      if(res?.errorMessage){
        this.notification.showErrorNotification('', res.errorMessage)
      }else{
        this.notification.showSucessNotification('', res.message)
        this.hideModal();
        this.form.reset();
      }
    })
  }

}

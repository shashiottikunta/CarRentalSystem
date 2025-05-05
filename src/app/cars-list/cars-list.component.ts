import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../services/http-service/http.service';
import { NotificationService } from '../services/notification-service/notification.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';



@Component({
  selector: 'app-cars-list',
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.css']
})
export class CarsListComponent implements OnInit {
carList:any= [];
addCarform:FormGroup;
submitted :boolean= false;
imageList:any =[];
selectedFiles:any;

@ViewChild('showDetailsData') showDetailsModal:any;
  car_id: any;
  showFileUploadOption: boolean = false;
  constructor(private fb: FormBuilder, private httpservice: HttpService, private sanitizer: DomSanitizer,
    private readonly router: Router, private notification: NotificationService) {
      this.addCarform = this.fb.group({
        name:['', Validators.required],
        number:['', Validators.required],
        price:['', Validators.required],
        seat:['', Validators.required],
        addLine1:['', Validators.required],
        addLine2:[''],
        state:['', Validators.required],
        city:['', Validators.required],
        country:['', Validators.required],
        zipcode:['', Validators.required],
      })
  }
  ngOnInit(): void {
    this.httpservice.doGet(`ownercardetails/${localStorage.getItem('userId')}`).subscribe((res)=>{
      this.carList = res;
     })

}

showModal(data:any, images:any){
  this.imageList = images;
  this.car_id = data?.id
  this.showDetailsModal.show();
  this.addCarform.patchValue({
    name:data?.name,
    number:data?.registration_number,
    price:data?.price_per_day,
    seat:data?.seating_capacity,
    addLine1:data?.addressline1,
    addLine2:data?.addressline2,
    state:data?.state,
    city:data?.city,
    country:data?.country,
    zipcode:data?.zipcode
  })
}
hideModal(){
  this.showDetailsModal.hide()
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
deleteImage(image: any) {
  const index = this.imageList.indexOf(image);
  if (index !== -1) {
    this.imageList.splice(index, 1);
  }
  this.showFileUploadOption = true;
}

onFileSelect(event: any): void {
  this.selectedFiles = event.target.files;
  console.log("sathya")
}
submit(){
  const formData = new FormData();
  let payload ={
    'id':this.car_id,
    "owner_id" :localStorage.getItem('userId'),
    "name":this.addCarform.get('name')?.value,
    "registration_number":this.addCarform.get('number')?.value,
    "price_per_day":this.addCarform.get('price')?.value,
    "seating_capacity":this.addCarform.get('seat')?.value,
    "addressline1":this.addCarform.get('addLine1')?.value,
    "addressline2" :this.addCarform.get('addLine2')?.value,
    "city" : this.addCarform.get('city')?.value,
    "state" : this.addCarform.get('state')?.value,
    "country" : this.addCarform.get('country')?.value,
    "zipcode" :this.addCarform.get('zipcode')?.value,
  
  }
  formData.append('payload', JSON.stringify(payload));
  if(this.selectedFiles){
    for (let i = 0; i < this.selectedFiles.length; i++) {
      console.log(this.selectedFiles[i])
      formData.append('files', this.selectedFiles[i]);
    }}
    this.httpservice.doUpdate('cardetails_update', formData).subscribe((res)=>{
      if(res){
        this.notification.showSucessNotification('',res.message)
        // this.addCarform.reset();
        this.hideModal()
        this.httpservice.doGet(`ownercardetails/${localStorage.getItem('userId')}`).subscribe((res)=>{
          this.carList = res;
        //   res.forEach((element: any) => {
        //     this.carList.push(element) 
        //   });
         })
      }else{
        this.notification.showErrorNotification('','Enter Valid Data')

      }
    })
  // }else{
  //   this.notification.showWarningNotification('', 'Please Upload atleast one image')

  // }
 
}

}
  
 


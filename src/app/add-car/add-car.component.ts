import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../services/http-service/http.service';
import { NotificationService } from '../services/notification-service/notification.service';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit {
  addCarform:FormGroup;
  submitted = false;
  selectedFiles:any;
  constructor(private fb: FormBuilder, private httpservice: HttpService, private readonly router: Router, private notification: NotificationService) {
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
  }

  onFileSelect(event: any): void {
    this.selectedFiles = event.target.files;
  }
  submit(){
    const formData = new FormData();
    let payload ={
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
        formData.append('files', this.selectedFiles[i]);
      }
      this.httpservice.doPost('add_car', formData).subscribe((res)=>{
        if(res){
          this.notification.showSucessNotification('',res.message)
          this.addCarform.reset();
        }else{
          this.notification.showErrorNotification('','Enter Valid Data')
  
        }
      })
    }else{
      this.notification.showWarningNotification('', 'Please Upload atleast one image')

    }
   
  }

}


// const formData = new FormData();
// formData.append('payload', JSON.stringify(payload));
// for (let i = 0; i < this.selectedFiles.length; i++) {
//   formData.append('files', this.selectedFiles[i]);
// }

// this.httpservice.doPost('uploadfiles', formData).subscribe(response => {
//   console.log(response);
//   alert('Files uploaded successfully');
// });

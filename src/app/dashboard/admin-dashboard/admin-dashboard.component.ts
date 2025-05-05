import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http-service/http.service';
import { NotificationService } from 'src/app/services/notification-service/notification.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  countList:any;
  selectedFiles!: FileList;
  constructor(private fb: FormBuilder, private httpservice: HttpService, private readonly router: Router, private notification: NotificationService) {
  }
  ngOnInit(): void {
    this.getData();
  }
  getData(){
    this.httpservice.doGet('admin_dashboard').subscribe((res)=>{
      this.countList = res;
    })

  }
 

  onFileSelect(event: any): void {
    this.selectedFiles = event.target.files;
  }
  

  onUpload(): void {
    const payload = {
      "id": "123",
      "status": "active",
      "comments": "bnm"
    }; 

    const formData = new FormData();
    formData.append('payload', JSON.stringify(payload));
    for (let i = 0; i < this.selectedFiles.length; i++) {
      formData.append('files', this.selectedFiles[i]);
    }
    
    this.httpservice.doPost('uploadfiles', formData).subscribe(response => {
      console.log(response);
      alert('Files uploaded successfully');
    });
  }
}


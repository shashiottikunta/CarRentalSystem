import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http-service/http.service';
import { NotificationService } from 'src/app/services/notification-service/notification.service';

@Component({
  selector: 'app-all-customers-list',
  templateUrl: './all-customers-list.component.html',
  styleUrls: ['./all-customers-list.component.css']
})
export class AllCustomersListComponent implements OnInit {
  list:any;
  count:any;
  details:any;
  @ViewChild('updateData') updateModal: any;
  modalForm: FormGroup;
  statusList = ['Active', 'Inactive']
  constructor(private fb: FormBuilder, private httpservice: HttpService, private readonly router: Router, private notification: NotificationService) { 

    this.modalForm = this.fb.group({
      status: [''],
      comments:['']
    })
  }

  ngOnInit(): void {
    this.getCustomerList();
  }


  getCustomerList() {
    this.httpservice.doGet('all_customers').subscribe((res) => {
      this.list = res;
      this.count = res.length;
    })
  }
  update(data:any){
    this.details = data;
    this.showModal();

  }

  showModal(){
    this.updateModal.show();
    this.modalForm.patchValue({
      status: this.details?.status
    })
  }

  hideModal(){
    this.updateModal.hide();
  }

  submit(data: any) {
    let payload = {
      "id": data.id,
      "status": this.modalForm.get('status')?.value,
      "comments": this.modalForm.get('comments')?.value,
    }
    this.httpservice.doUpdate('active_inactive_users',payload).subscribe((res)=>{
      this.notification.showSucessNotification('','Details Updated Successfully')
      this.getCustomerList();
      this.hideModal();
    })

  }

}

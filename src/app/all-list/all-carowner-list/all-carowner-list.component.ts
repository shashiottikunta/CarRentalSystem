import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http-service/http.service';
import { NotificationService } from 'src/app/services/notification-service/notification.service';

@Component({
  selector: 'app-all-carowner-list',
  templateUrl: './all-carowner-list.component.html',
  styleUrls: ['./all-carowner-list.component.css']
})
export class AllCarownerListComponent implements OnInit {
  list: any;
  count: any;
  details: any;
  modalForm: FormGroup;
  statusList = ['Active', 'Inactive']

  @ViewChild('updateData') updateModal: any;

  constructor(private fb: FormBuilder, private httpservice: HttpService, private readonly router: Router, private notification: NotificationService) {

    this.modalForm = this.fb.group({
      status: [''],
      comments:['']
    })
  }
  ngOnInit(): void {
    this.getCarOwnerList();
  }

  getCarOwnerList() {
    this.httpservice.doGet('all_car_owners').subscribe((res) => {
      this.list = res;
      this.count = res.length;
    })
  }
  update(data: any) {
    this.details = data;
    console.log(this.details)
    this.showModal();

  }

  showModal() {
    this.updateModal.show();
    this.modalForm.patchValue({
      status: this.details?.status
    })
  }

  hideModal() {
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
      this.getCarOwnerList();
      this.hideModal();

    })

  }

}

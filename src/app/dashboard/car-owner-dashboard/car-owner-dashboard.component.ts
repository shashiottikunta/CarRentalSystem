import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { HttpService } from 'src/app/services/http-service/http.service';

@Component({
  selector: 'app-car-owner-dashboard',
  templateUrl: './car-owner-dashboard.component.html',
  styleUrls: ['./car-owner-dashboard.component.css']
})
export class CarOwnerDashboardComponent implements OnInit {

  constructor(
    private httpservice: HttpService,
    private changeDetectorRef: ChangeDetectorRef,
    private sanitizer: DomSanitizer
  ) {}

  cars: any[] = [];

  ngOnInit(): void {
    let a = localStorage.getItem('userId')
    console.log(a)
    this.httpservice.doGet(`ownercardetails/${a}`).subscribe((res) => {
      this.cars = res;
      this.changeDetectorRef.detectChanges(); // Trigger change detection
    });
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

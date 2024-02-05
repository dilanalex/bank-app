import {Component, OnInit} from '@angular/core';
import {ServiceService} from '../services/service.service';
import {formatDate} from '@angular/common';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-account-create',
    templateUrl: './account.create.component.html',
    styleUrls: ['./account.create.component.css']
})
export class AccountCreateComponent implements OnInit {
    public email: string;
    public name: string;
    public contactNo: string;
    public dob: Date;
    public ngbDate: NgbDateStruct;
    public age: number;
    
    constructor(private service: ServiceService,
      private toastr: ToastrService) {
      
    }

    ngOnInit(): void {

    }

    createAccount() {
      const accountDetails = {
          name: this.name,
          email: this.email,
          dob: this.ngbDate.year + '-'
              + (this.ngbDate.month < 10 ? '0' + this.ngbDate.month : this.ngbDate.month) + '-'
              + (this.ngbDate.day < 10 ? '0' + this.ngbDate.day : this.ngbDate.day),
          contactNo: this.contactNo
      };
      console.log(accountDetails);
      this.service.onCreateAccount(accountDetails).subscribe(
          response => {
              this.toastr.success(response['message']);
          }
      );
  }
}

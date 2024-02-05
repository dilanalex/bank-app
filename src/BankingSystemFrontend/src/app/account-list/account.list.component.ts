import {Component, OnInit} from '@angular/core';
import {ServiceService} from '../services/service.service';
import {formatDate} from '@angular/common';

@Component({
    selector: 'app-account-list',
    templateUrl: './account.list.component.html',
    styleUrls: ['./account.list.component.css']
})
export class AccountListComponent implements OnInit {
    accounts: any;
    constructor(private service: ServiceService) {
    }

    ngOnInit(): void {
      this.getAccountList();
    }

    getAccountList(){
      this.service.getAccountList().subscribe(
          response => {
  
            this.accounts = response;
            console.log(this.accounts);
          }
      );
  
    }

  formatDate(date) {
    return formatDate(date, 'mediumDate', 'en-us', '+530');
  }
}

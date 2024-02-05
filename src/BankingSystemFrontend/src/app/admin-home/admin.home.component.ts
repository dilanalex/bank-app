import { Component, OnInit } from '@angular/core';
import {ServiceService} from '../services/service.service';

@Component({
  selector: 'app-home',
  templateUrl: './admin.home.component.html',
  styleUrls: ['./admin.home.component.css']
})
export class AdminHomeComponent implements OnInit {

  userProfile: any;
  transactions: any;

  constructor(private service: ServiceService) {
  }

  ngOnInit(): void {
    this.getUserProfile();
  }

  getUserProfile(){
    this.service.onFetchProfile().subscribe(
        response => {

          this.userProfile = response;
          console.log(this.userProfile);
        }
    );

  }

  

}

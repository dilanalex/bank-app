import { Component, OnInit } from '@angular/core';
import {ServiceService} from '../services/service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userProfile: any;

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

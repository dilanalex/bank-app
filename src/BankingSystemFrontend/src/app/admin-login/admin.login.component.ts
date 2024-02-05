import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {HttpErrorResponse} from '@angular/common/http';
import {ServiceService} from '../services/service.service';

@Component({
    selector: 'app-login',
    templateUrl: './admin.login.component.html',
    styleUrls: ['./admin.login.component.css']
})
export class AdminLoginComponent implements OnInit {
    private responseReceived: boolean;
    public adminLoginForm: FormGroup;

    constructor(/*private service: ServiceService, private router: Router, private toastr: ToastrService*/
                private router: Router,
                private service: ServiceService,
                private toastr: ToastrService
    ) {
    }

    ngOnInit() {
        this.adminLoginForm = new FormGroup({
            contactNo: new FormControl(null, Validators.required),
            pin: new FormControl(null, Validators.required)
        })
    }

    login() {
        this.responseReceived = false;
        const loginDetails = {
            username: this.adminLoginForm.value.contactNo,
            password: this.adminLoginForm.value.pin
        };
        console.log(loginDetails);
        this.service.loginCall(loginDetails).subscribe(
            response => {
                this.responseReceived = true;
                console.log('response-body: ', response);
                sessionStorage.setItem('auth-token', response['token']);
                sessionStorage.setItem('userName', response['user']['name']);
                sessionStorage.setItem('contactNo', response['user']['contactno']);
                this.router.navigate(['admin/home']);
                this.toastr.success('Login Successful');
            },
            (error: HttpErrorResponse) => {
                this.responseReceived = true
            }
        );
    }
}

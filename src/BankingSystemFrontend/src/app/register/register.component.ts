import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ServiceService} from '../services/service.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    public registerForm: FormGroup;
    emailPattern: String;
    contactNoPattern: String;
    pinPattern: string;
    formValid: boolean = true;

    constructor(
        private service: ServiceService,
        private toastr: ToastrService,
        private router: Router
    ) {
        this.emailPattern = '^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$';
        //this.contactNoPattern = '^[6,7,8,9]{1}[0-9]{9}$';
        this.pinPattern = '^[0-9]{4}';
    }

    ngOnInit(): void {
        this.registerForm = new FormGroup(
            {
               
                contactNo: new FormControl(null, Validators.required),
                pin: new FormControl(null, Validators.required)

            }
        )
    }

    submitForm() {
        const userDetails = {
            contactNo: this.registerForm.value.contactNo,
            pin: this.registerForm.value.pin

        };
        this.service.onRegister(userDetails).subscribe(
            response => {
                this.router.navigate(['/login']);
                this.toastr.success(response['message']);
            }
        );
    }

    get u() {
        return this.registerForm.controls;
    }
}
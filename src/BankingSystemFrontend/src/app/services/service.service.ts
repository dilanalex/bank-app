import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {throwError, BehaviorSubject, Subject} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {environment} from '../../environments/environment';


@Injectable({
    providedIn: 'root'
})
export class ServiceService {

    LoginUrl = environment.apiUrl + '/login';
    UserUrl = environment.apiUrl + '/user';
    adminUrl = environment.apiUrl + '/admin';

    private _refreshNeeded$ = new Subject<void>();
    private accountUrl: string = environment.apiUrl + '/account';
    private transferUrl: string = environment.apiUrl + '/transfer';
    private trasactionUrl: string = environment.apiUrl + '/transaction';
    
    private accountListUrl: string = environment.apiUrl + '/account-list';
    private accountCreateUrl: string = environment.apiUrl + '/account-create';
    private userMapUrl: string = environment.apiUrl + '/map-user';

    constructor(
        private http: HttpClient,
        private toastr: ToastrService
    ) {
    }

    get refreshNeeded$() {
        return this._refreshNeeded$;
    }

    loginCall(loginDetails) {
        return this.http.post(this.LoginUrl, loginDetails).pipe(catchError(error => this.handleError(error)));
    }

    private handleError(error: HttpErrorResponse) {
        if (error && error['error'] && error['error']['message'] === 'Unauthorized') {
            this.toastr.error('Invalid username or password.');
            return throwError(error);
        }
        return throwError(this.toastr.error(error['error']['message']));

    }

    onFetchProfile() {
        let header = new HttpHeaders();
        header = header.append('token', sessionStorage.getItem('auth-token'));
        return this.http.get(this.UserUrl, {headers: header}).pipe(catchError(error => this.handleError(error)));
    }

    onUpdateProfile(userDetails: { dob: string; name: string; email: string }) {
        let headers = new HttpHeaders();
        headers = headers.append('token', sessionStorage.getItem('auth-token'));
        const options = {headers};
        return this.http.put(this.UserUrl, userDetails, options).pipe(tap(() => {
            this.refreshNeeded$.next();
        }), catchError(error => this.handleError(error)));
    }

    onRegister(userDetails) {
        return this.http.post(this.UserUrl, userDetails).pipe(catchError(error => this.handleError(error)));
    }

    onGetAccount() {
        let headers = new HttpHeaders();
        headers = headers.append('token', sessionStorage.getItem('auth-token'));
        const options = {headers};
        return this.http.get(this.accountUrl, options).pipe(catchError(error => this.handleError(error)));
    }

    getAccountList() {
        let headers = new HttpHeaders();
        headers = headers.append('token', sessionStorage.getItem('auth-token'));
        const options = {headers};
        return this.http.get(this.accountListUrl, options).pipe(catchError(error => this.handleError(error)));
    }

    transferMoney(transferDetails) {
        let headers = new HttpHeaders();
        headers = headers.append('token', sessionStorage.getItem('auth-token'));
        const options = {headers};
        return this.http.post(this.transferUrl, transferDetails, options).pipe(catchError(error => this.handleError(error)));
    }

    getTransactions() {
        let headers = new HttpHeaders();
        headers = headers.append('token', sessionStorage.getItem('auth-token'));
        const options = {headers};
        return this.http.get(this.trasactionUrl, options).pipe(catchError(error => this.handleError(error)));
    }

    getUserInfo() {
        let headers = new HttpHeaders();
        headers = headers.append('token', sessionStorage.getItem('auth-token'));
        const options = {headers};
        return this.http.get(this.trasactionUrl, options).pipe(catchError(error => this.handleError(error)));
    }

    onCreateAccount(accountDetails: { dob: string; name: string; email: string; contactNo: string }) {
        //return this.http.post(this.accountCreateUrl, accountDetails).pipe(catchError(error => this.handleError(error)));
        //return this.http.post(this.accountCreateUrl, accountDetails, options).pipe(catchError(error => this.handleError(error)));
        let headers = new HttpHeaders();
        headers = headers.append('token', sessionStorage.getItem('auth-token'));
        const options = {headers};
        return this.http.post(this.accountCreateUrl, accountDetails, options).pipe(catchError(error => this.handleError(error)));
    }

    updateProfile(userDetails: { contactNo: string; pin: string}) {
        return this.http.post(this.userMapUrl, userDetails).pipe(catchError(error => this.handleError(error)));
    }
}

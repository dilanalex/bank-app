import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {Routes, RouterModule} from '@angular/router';

import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {HomeComponent} from './home/home.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {AccountComponent} from './account/account.component';
import {TransferMoneyComponent} from './transfer-money/transfer-money.component';
import {TransactionHistoryComponent} from './transaction-history/transaction-history.component';
import {AuthGuardService} from './guard/auth-guard.service';
import {LoginGuardService} from './guard/login-guard.service';
import {AdminLoginComponent} from './admin-login/admin.login.component';
import {AdminHomeComponent} from './admin-home/admin.home.component';
import {AccountListComponent} from './account-list/account.list.component';
import {AccountCreateComponent} from './account-create/account.create.component';

const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'login', component: LoginComponent, canActivate: [LoginGuardService]},
    {path: 'admin', component: AdminLoginComponent, canActivate: [LoginGuardService]},
    {path: 'register', component: RegisterComponent, canActivate: [LoginGuardService]},
    {path: 'home', component: HomeComponent, canActivate: [AuthGuardService]},
    {path: 'admin/home', component: AdminHomeComponent, canActivate: [AuthGuardService]},
    {path: 'profile', component: UserProfileComponent, canActivate: [AuthGuardService]},
    {path: 'account', component: AccountComponent, canActivate: [AuthGuardService]},
    {path: 'transfer', component: TransferMoneyComponent, canActivate: [AuthGuardService]},
    {path: 'history', component: TransactionHistoryComponent, canActivate: [AuthGuardService]},
    {path: 'admin/account-list', component: AccountListComponent, canActivate: [AuthGuardService]},
    {path: 'admin/account-create', component: AccountCreateComponent, canActivate: [AuthGuardService]},
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes, {
            useHash: true
        })
    ],
    exports: [],
})
export class AppRoutingModule {
}

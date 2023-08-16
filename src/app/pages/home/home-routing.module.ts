import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { LoginComponent } from 'src/app/components/login/login.component';
import { RegisterComponent } from 'src/app/components/register/register.component';
import { DashboardComponent } from 'src/app/components/dashboard/dashboard.component';
import { ForgotComponent } from 'src/app/components/forgot/forgot.component';
import { VerifyEmailComponent } from 'src/app/components/verify-email/verify-email.component';
import { PhoneComponent } from 'src/app/components/phone/phone.component';
import { AuthGuard } from 'src/app/auth.guard';

const routes: Routes = [
  {
    path:'home',
    component:HomeComponent
  },
  { path : '', redirectTo:'login',pathMatch:'full'},
  { path : 'login', component : LoginComponent},
  { path : 'register', component : RegisterComponent},
  { path : 'dashboard', component : DashboardComponent,canActivate:[AuthGuard]},
  { path : 'forgot', component : ForgotComponent},
  { path : 'verify-email', component : VerifyEmailComponent},
  { path : 'phone' , component : PhoneComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

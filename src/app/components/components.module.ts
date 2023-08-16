import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddRecordsComponent } from './add-records/add-records.component';
import { MaterialModule } from '../modules/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { UpdateRecordComponent } from './update-record/update-record.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { RouterModule } from '@angular/router';
import { ForgotComponent } from './forgot/forgot.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { PhoneComponent } from './phone/phone.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    AddRecordsComponent,
    UpdateRecordComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    ForgotComponent,
    VerifyEmailComponent,
    PhoneComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterModule,
    MatSelectModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatIconModule,
    MatProgressSpinnerModule
  ]
})
export class ComponentsModule { }

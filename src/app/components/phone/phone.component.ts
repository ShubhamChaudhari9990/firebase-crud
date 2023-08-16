import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servies/auth.service';


interface Countries {
  name: string;
  phoneCode: string;
}

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.css']
})
export class PhoneComponent {

  // countryControl = new FormControl<Countries | null>(null, Validators.required);

  selectedCountry!: string;
  countries: Countries[] = [
    { name: 'United States', phoneCode: '+1' },
    { name: 'India', phoneCode: '+91' },
    { name: 'Mexico', phoneCode: '+52' },
  ];


  phoneNumber: any = '';
  verificationCode: string = '';
  verificationCodeSend: boolean = false;
  confirmOtp: any

  constructor(private serice: AuthService, private router: Router) { }

  sendVerificationCode() {
    console.log(this.selectedCountry);
    if (this.phoneNumber.length === 10 && this.selectedCountry != undefined) {

      this.serice.verification(this.selectedCountry, this.phoneNumber).then(res => {
        this.verificationCodeSend = true
        this.confirmOtp = res
      }).catch(res => {
        alert(res);
      })
    }
    else {
      alert("Please enter correct Phone Number OR Select Country Code");
    }
  }

  verifyCode() {
    this.confirmOtp.confirm(this.verificationCode).then((res: any) => {
      localStorage.setItem('authToken','true');
      this.router.navigate(['/dashboard']);
    }).catch((err: any) => {
      alert(err);
    })
  }
} 

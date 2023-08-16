import { Component } from '@angular/core';
import { AuthService } from 'src/app/servies/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  email : string = '';
  password : string = '';
  confirmPassword : string = '';

  constructor(private auth : AuthService) { }

  ngOnInit(): void {
  }

  register() {

    if(this.email == '') {
      alert('Please enter email');
      return;
    }

    if(this.password == '') {
      alert('Please enter password');
      return;
    }

    if(this.password === this.confirmPassword)
    {
      this.auth.register(this.email,this.password);
    }
    else
    {
      alert('Your Password not Match');
    }
    
    this.email = '';
    this.password = '';
    this.confirmPassword = '';

  }

}

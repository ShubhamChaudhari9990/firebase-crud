import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servies/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email : string = '';
  password : string = '';

  constructor(private auth : AuthService,private router : Router) { }

  ngOnInit(): void {
    const isLoggedIn = localStorage.getItem('authToken') ? true : false
    if (isLoggedIn) {
      this.router.navigate(['dashboard'])
    }
  }

  login() {

    if(this.email == '') {
      alert('Please enter email');
      return;
    }

    if(this.password == '') {
      alert('Please enter password');
      return;
    }

    this.auth.login(this.email,this.password).then(res => {
      if (res.user?.emailVerified == true) {

        localStorage.setItem('authToken', 'true');
        // sessionStorage.setItem(this.email,this.password);
        // alert("Login Successfully")
        this.router.navigate(['/dashboard']);
      }
      else {
        alert('verify your account')
        this.router.navigate(['/verify-email']);
      }

    },
      err => {
        alert(err.message);
        this.router.navigate(['/login']);
      })
    
    this.email = '';
    this.password = '';

  }

  signInWithGoogle() {
    this.auth.googleSignIn();
  }

  signInWithFacebook() {
    this.auth.facebookSignIn();
  }

  signInWithGithub() {
    this.auth.githubSignIn();
  }


}

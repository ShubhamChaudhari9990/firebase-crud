import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
import { FacebookAuthProvider, GithubAuthProvider, GoogleAuthProvider, getAuth, user } from '@angular/fire/auth';
import * as firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { signInWithPopup } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authTokenKey = 'authToken';

  constructor(private afu: AngularFireAuth, private router: Router) {
    // const isAuthenticated = this.isAuthenticated();
  }

  //  Authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.authTokenKey);
  }

  //  login 
  login(email: string, password: string) {
    return this.afu.signInWithEmailAndPassword(email, password)
  }

  //  Register 
  register(email: string, password: string) {
    this.afu.createUserWithEmailAndPassword(email, password).then((res) => {
      alert("Registration Successfully ....!");
      res.user?.sendEmailVerification();
      alert("Please Verify Email id");
      console.log(res);
      
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
      this.router.navigate(['/register'])
    })
  }

  //  logout
  logout() {
    this.afu.signOut().then(() => {
      // this.isUserLogIn = false;      
      localStorage.removeItem('authToken');
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
    })
  }

  //  Forgot Password
  forgotPassword(email: string) {
    this.afu.sendPasswordResetEmail(email).then(() => {
      this.router.navigate(['/verify-email']);
      alert('Email send successfully');
    }, err => {
      alert('Something went wrong');
    })
  }

  //  Google SignIn
  googleSignIn() {
    this.afu.signInWithPopup(new GoogleAuthProvider).then(res => {
      this.router.navigate(['/dashboard']);
      localStorage.setItem('authToken', JSON.stringify(res.user?.uid));
    }, err => {
      alert(err.message);
    })
  }

  //  Facebook SignIn
  facebookSignIn() {
    // this.afu.signInWithPopup(auth,provide).then( res => {
    //   this.router.navigate(['/dashboard']);
    // }).catch((err : any) => {
    //   alert(err);
    // })
    const provide = new FacebookAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth,provide).then( res => {
      const user = res.user;
      const credential = FacebookAuthProvider.credentialFromResult(res);
      const accessToken = credential?.accessToken;
      this.router.navigate(['/dashboard']);
    }).catch((error) => {
      alert(error);
    })
  }

  //  Github SignIn
  githubSignIn() {
    this.afu.signInWithPopup(new GithubAuthProvider).then( res => {
      this.router.navigate(['/dashboard']);
      localStorage.setItem('authToken', JSON.stringify(res.user?.uid));
    }).catch((error ) => {
      alert(error);
    })
  }

  //  Phone verification
  verification(selectedCountry: string, phoneNumber: string) {
    const fullNumber = selectedCountry + phoneNumber;
    const appVerifier = new firebase.default.auth.RecaptchaVerifier('recaptcha-container');
    return firebase.default.auth().signInWithPhoneNumber(fullNumber, appVerifier)
  }

}
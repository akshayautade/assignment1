import { Observable } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthResponse } from '../Interfaces/auth-response.interface';
import Swal from 'sweetalert2';
import { EmailValidator } from '../Helper/customValidators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginMode = true;
  Form: FormGroup | any

  constructor(
    private _authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    document.body.className = "login-bg";
    this.Form = new FormGroup({
      'firstName': new FormControl(null),
      'lastName': new FormControl(null),
      'username': new FormControl(null, [Validators.required,EmailValidator]),
      'password': new FormControl(null, Validators.required),
    })
  }

  onModeSwitch() {
    this.loginMode = !this.loginMode
  }

  onLogin() {
    const firstName = this.Form.value.firstName;
    const lastName = this.Form.value.lastName;
    const email = this.Form.value.username;
    const password = this.Form.value.password;
    this.Form.markAllAsTouched()
    if (this.Form.valid) {

      let authObservavle:Observable<AuthResponse>

      if (this.loginMode) {
        authObservavle = this._authService.SignIn(email, password)
      } else {
        authObservavle = this._authService.SignUp(firstName,lastName,email , password)
      }
      authObservavle.subscribe( res => {
         if(res.isError){
            Swal.fire({
              icon:'error',
              title: 'Error..!',
              text: res.error,
           })
         }
         else{
        Swal.fire({
          icon: 'success',
          title: "Login Successfully!",
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate(['/dashboard']);
      }},
      err => {
        Swal.fire({
          icon: 'error',
          title: "Invalid User..!",
          text:err.error.message,
        })
      })
    }
  }

  forget(){
    Swal.fire({
      icon: 'warning',
      title: "Warning",
      text:  "Contact your Admin to forget your password"
      //showConfirmButton: false,
      //timer: 2000
    })
  }
}

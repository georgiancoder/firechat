import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService, public router: Router) {
    this.loginForm = this.fb.group({
      email: new FormControl(null),
      password: new FormControl(null)
    });
  }

  login() {
    this.authService.SignIn(this.loginForm.value.email, this.loginForm.value.password).then(() => {
      setTimeout(() => {
        this.router.navigate(['messenger']);
      }, 100);
    }).catch(error => {
      console.log(error);
    });
  }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-registation',
  templateUrl: './registation.component.html',
  styleUrls: ['./registation.component.css']
})
export class RegistationComponent implements OnInit {
  months: string[];
  days = Array.from(Array(31), (x, index) => index + 1);
  years = Array.from(Array(300), (x, index) => new Date().getFullYear() - index);
  registerForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.months = ['jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    this.registerForm = this.fb.group({
      firstName: new FormControl(null),
      lastName: new FormControl(null),
      email: new FormControl(null),
      password: new FormControl(null),
      month: new FormControl(''),
      day: new FormControl(''),
      year: new FormControl(''),
      gender: new FormControl(null)
    });
  }

  register() {
    this.authService.SignUp(this.registerForm.value);
  }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import {Spinkit, SpinnerVisibilityService} from 'ng-http-loader';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  validateForm!: FormGroup;


  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    this.spainer.show();
    this.userService.login(this.validateForm.value).subscribe(
      res => {
        this.spainer.hide();
        localStorage.setItem('auth', JSON.stringify(res));
        if (res.roles[0] === 'ROLE_ADMIN') {
          // tslint:disable-next-line:no-shadowed-variable
          window.location.href = 'welcome';

        } else {
          // tslint:disable-next-line:no-shadowed-variable
          window.location.href = '/';
        }
      },
      err => {
        this.spainer.hide();
        console.log(err);
      }
    );
  }

  constructor(
    private spainer: SpinnerVisibilityService,
    private  router: Router, private fb: FormBuilder, private userService: UserService) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  login(): void {

  }

}

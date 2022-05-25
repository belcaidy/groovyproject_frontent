import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NzButtonSize} from 'ng-zorro-antd/button';
import {User} from '../company.model';
import {ActivatedRoute, Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/message';
import {UserService} from '../../../service/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {
  validateForm!: FormGroup;
  isCollapsed = false;
  size: NzButtonSize = 'large';
  images = [];
  user = {} as User;
  id = '';
  showError = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private userService: UserService,
    private message: NzMessageService) {
  }

  ngOnInit(): void {


    this.validateForm = this.fb.group({
      username: ['', [Validators.required]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      role: ['', [Validators.required]],
    });


    if (this.route.snapshot.paramMap.get('id')) {
      const id = this.route.snapshot.paramMap.get('id');
      this.id = id;
      this.userService.getUserById(id).subscribe(
        res => {
          console.log(res);
          this.user = res;

        },
        err => {
          console.log(err);
        }
      );

    }
  }

  submitForm(): void {
    // tslint:disable-next-line:forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    console.log(this.validateForm.value);
    const payload = {
      ...this.validateForm.value,
      id: this.id
    };
    this.userService.updateUser(payload).subscribe(
      res => {
        this.validateForm.reset();
        this.images = [];
        this.message.info('A Advertisement is update successfully');
        console.log('done');
        this.router.navigateByUrl('/welcome');
      },
      err => {
        console.log(err);
      }
    );
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return {required: true};
    } else if (control.value !== this.validateForm.controls.password.value) {
      return {confirm: true, error: true};
    }
    return {};
  }


}

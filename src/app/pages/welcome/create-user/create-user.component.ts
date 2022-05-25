import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NzButtonSize} from 'ng-zorro-antd/button';
import {AnnouncementService} from '../../../service/announcement.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {UserService} from '../../../service/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  validateForm!: FormGroup;
  isCollapsed = false;
  size: NzButtonSize = 'large';
  images = [];
  showError = false;

  constructor(private fb: FormBuilder,
              private saleService: AnnouncementService,
              private message: NzMessageService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: ['', [Validators.required]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      role: ['', [Validators.required]],
    });
  }

  submitForm(): void {
    // tslint:disable-next-line:forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.valid) {
      this.userService.registration(this.validateForm.value).subscribe(
        res => {
          this.validateForm.reset();
          this.message.info('A user is save successfully');
        },
        err => {

          this.showError = true;
          this.message.error('Username must be unique');
          console.log(err);
        }
      );
    } else {
      this.message.info('Please Try Again');
    }
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

  afterClose(): void {
    this.showError = false;
    console.log('close');
  }
}

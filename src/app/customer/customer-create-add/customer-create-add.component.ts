import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzButtonSize} from 'ng-zorro-antd/button';
import {AnnouncementService} from '../../service/announcement.service';
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
  selector: 'app-customer-create-add',
  templateUrl: './customer-create-add.component.html',
  styleUrls: ['./customer-create-add.component.scss']
})
export class CustomerCreateAddComponent implements OnInit {

  validateForm!: FormGroup;
  isCollapsed = false;

  size: NzButtonSize = 'large';
  images = [];

  constructor(private fb: FormBuilder,
              private saleService: AnnouncementService,
              private message: NzMessageService) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]],
      subTitle: ['', [Validators.required]],
      illustrations: [''],
    });
  }

  onFileChange(event): void {
    if (event.target.files && event.target.files[0]) {
      // tslint:disable-next-line:prefer-const
      let filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        const reader = new FileReader();

        // tslint:disable-next-line:no-shadowed-variable
        reader.onload = (event: any) => {
          console.log(event.target.result);
          this.images.push(event.target.result);

          this.validateForm.patchValue({
            illustrations: this.images
          });
        };

        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  removeImage(index): void {
    this.images.indexOf(index);
    if (index > -1) {
      this.images.splice(index, 1);
    }
  }

  submitForm(): void {
    // tslint:disable-next-line:forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.valid) {
      this.saleService.createAnnouncement(this.validateForm.value).subscribe(
        res => {
          this.validateForm.reset();
          this.message.info('A Advertisement is save successfully');
        },
        err => {
          this.message.error('Wrong Input or please check back end is running or not !!!');
          console.log(err);
        }
      );
    }

  }
}

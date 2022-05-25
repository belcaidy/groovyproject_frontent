import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AnnouncementService} from '../../../service/announcement.service';
import {NzButtonSize} from 'ng-zorro-antd/button';
import {NzMessageService} from 'ng-zorro-antd/message';
import {ActivatedRoute, Router} from '@angular/router';
import {Announce} from '../company.model';

@Component({
  selector: 'app-edit-adds',
  templateUrl: './edit-adds.component.html',
  styleUrls: ['./edit-adds.component.scss']
})
export class EditAddsComponent implements OnInit {
  validateForm!: FormGroup;
  isCollapsed = false;
  size: NzButtonSize = 'large';
  images = [];
  announce = {} as Announce;
  id = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private saleService: AnnouncementService,
    private message: NzMessageService) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]],
      subTitle: ['', [Validators.required]],
      longDescription: ['', [Validators.required]],
      illustrations: [''],
      file: [''],
    });


    if (this.route.snapshot.paramMap.get('id')) {
      const id = this.route.snapshot.paramMap.get('id');
      this.id = id;
      this.saleService.getAnnouncementById(id).subscribe(
        res => {
          this.announce = res.announce;
          res.images.map(data => {
            this.validateForm.patchValue({
              illustrations: data.imageString
            });
            this.images.push(data.imageString);
          });
        },
        err => {
          this.message.error('Please check backend status!');
        }
      );
    }
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
    console.log(this.validateForm.value);
    const payload = {
      ...this.validateForm.value,
      id: this.id
    };

    if (this.validateForm.valid) {
      this.saleService.updateAnnouncement(payload).subscribe(
        res => {
          this.validateForm.reset();
          this.images = [];
          this.message.info('A Advertisement is update successfully');
          console.log('done');
          this.router.navigateByUrl('/welcome');
        },
        err => {
          this.message.error('Please enter Valid inputs!');
        }
      );

    }
  }


}

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AnnouncementService} from '../../../service/announcement.service';
import {Announce} from '../company.model';

@Component({
  selector: 'app-show-adds-details',
  templateUrl: './show-adds-details.component.html',
  styleUrls: ['./show-adds-details.component.scss']
})
export class ShowAddsDetailsComponent implements OnInit {


  @Input() public isShowModal = false;
  @Input() public addId;
  isOkLoading = false;
  @Output() modalEmitter = new EventEmitter();
  announce: Announce;
  images = [];

  constructor(private saleService: AnnouncementService) {
  }

  ngOnInit(): void {
    this.saleService.getAnnouncementById(this.addId).subscribe(
      res => {

        this.announce = res.announce;
        console.log(this.announce);
        
        res.images.map(data => {
          this.images.push(data.imageString);
        });
      },
      err => {
        console.log(err);
      }
    );
  }

  handleCancel(): void {
    this.handleModalEmitter();
  }

  handleOk(): void {
    this.isOkLoading = true;
    this.handleModalEmitter();
  }

  handleModalEmitter(): void {
    this.isShowModal = false;
    this.addId = null;
    this.modalEmitter.emit(this.isShowModal);
    this.modalEmitter.emit(this.addId);
  }

}

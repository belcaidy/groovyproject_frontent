import {Component, OnInit} from '@angular/core';
import {AnnouncementService} from '../service/announcement.service';
import {UserService} from '../service/user.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {Announce, Company, SaleAdd} from '../pages/welcome/company.model';
import {NzButtonSize} from 'ng-zorro-antd/button';
import {NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder} from 'ng-zorro-antd/table';

@Component({
  selector: 'app-customer-announcement',
  templateUrl: './customer-announcement.component.html',
  styleUrls: ['./customer-announcement.component.scss']
})
export class CustomerAnnouncementComponent implements OnInit {

  isCollapsed = false;
  isShowModal = false;
  id: number;
  size: NzButtonSize = 'large';

  listOfColumns: ColumnItem[] = [
    {
      name: 'Title',
      sortOrder: null,
    },
    {
      name: 'Date Created',
      sortOrder: null,
    },
    {
      name: 'Price',
      sortFn: null,
      sortOrder: null
    },
    {
      name: 'Sub title',
      sortFn: null,
      sortOrder: null
    },

    {
      name: 'Actions',
      sortFn: null,
      sortOrder: null,
      listOfFilter: [
        {text: 'London', value: 'London'},
        {text: 'Sidney', value: 'Sidney'}
      ],
      filterFn: (address: string, item: Company) => item.CompanyName.indexOf(address) !== -1
    }
  ];
  listOfData: Announce[] = [];

  constructor(
    private userService: UserService,
    private message: NzMessageService,
    private http: AnnouncementService) {
  }

  ngOnInit(): void {
    this.reload();
  }

  reload(): void {
    this.http.getAnnouncementByCustomerName(this.userService.getUserName()).subscribe(
      res => {
        this.listOfData = res;
      },
      err => {
        console.log(err);
      }
    );
  }

  trackByName(_: number, item: ColumnItem): string {
    return item.name;
  }

  showModal(id: number): void {
    this.id = id;
    this.isShowModal = true;
  }

  delete(id): void {
    this.http.deleteAnnouncement(id).subscribe(
      res => {
        this.reload();
        this.message.error('A Advertisement is deleted!!');
      },
      err => {
        console.log(err);
      }
    );
  }

}

interface ColumnItem {
  name: string;
  sortOrder?: NzTableSortOrder | null;
  sortFn?: NzTableSortFn | null;
  listOfFilter?: NzTableFilterList;
  filterFn?: NzTableFilterFn | null;
}

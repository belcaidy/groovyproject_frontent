import {Component, OnInit} from '@angular/core';
import {NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder} from 'ng-zorro-antd/table';
import {Company, SaleAdd} from '../company.model';
import {AnnouncementService} from '../../../service/announcement.service';
import {NzButtonSize} from 'ng-zorro-antd/button';
import {NzMessageService} from 'ng-zorro-antd/message';


interface ColumnItem {
  name: string;
  sortOrder?: NzTableSortOrder | null;
  sortFn?: NzTableSortFn | null;
  listOfFilter?: NzTableFilterList;
  filterFn?: NzTableFilterFn | null;
}

@Component({
  selector: 'app-adds-list',
  templateUrl: './adds-list.component.html',
  styleUrls: ['./adds-list.component.scss']
})
export class AddsListComponent implements OnInit {
  isCollapsed = false;
  isShowModal = false;
  id: number;

  size: NzButtonSize = 'large';

  listOfColumns: ColumnItem[] = [
    {
      name: 'Title',
      sortOrder: null,
      sortFn: (a: SaleAdd, b: SaleAdd) => a.title.localeCompare(b.title),
      // filterFn: (list: string[], item: SaleAdd) => list.some(name => item.title.indexOf(name) !== -1)
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
      name: 'Short Description',
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
  listOfData: SaleAdd[] = [];
  isUpdatedPage = false;

  constructor(
    private message: NzMessageService,
    private http: AnnouncementService) {
  }

  ngOnInit(): void {
    this.reload();
  }

  reload(): void {
    this.http.getAnnouncementList().subscribe(
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

  sortByAge(): void {
    this.listOfColumns.forEach(item => {
      if (item.name === 'Age') {
        item.sortOrder = 'descend';
      } else {
        item.sortOrder = null;
      }
    });
  }

  resetFilters(): void {
    this.listOfColumns.forEach(item => {
      if (item.name === 'Name') {
        item.listOfFilter = [
          {text: 'Joe', value: 'Joe'},
          {text: 'Jim', value: 'Jim'}
        ];
      } else if (item.name === 'Address') {
        item.listOfFilter = [
          {text: 'London', value: 'London'},
          {text: 'Sidney', value: 'Sidney'}
        ];
      }
    });
  }

  resetSortAndFilters(): void {
    this.listOfColumns.forEach(item => {
      item.sortOrder = null;
    });
    this.resetFilters();
  }

  showModal(id: number): void {
    this.id = id;
    this.isShowModal = true;
  }

  handleCancel(): void {
  }

  handleOk(): void {
    // this.reload();
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

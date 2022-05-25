import {Component, OnInit} from '@angular/core';
import {SaleAdd, User} from '../company.model';
import {NzButtonSize} from 'ng-zorro-antd/button';
import {NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder} from 'ng-zorro-antd/table';
import {UserService} from '../../../service/user.service';
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  isCollapsed = false;
  id: number;
  size: NzButtonSize = 'large';

  listOfColumns: ColumnItem[] = [
    {
      name: 'UserName',
      sortOrder: null,
    },
    {
      name: 'Designation',
      sortOrder: null,
    },
    {
      name: 'Status',
      sortFn: null,
      sortOrder: null
    },
    {
      name: 'Actions',
      sortFn: null,
      sortOrder: null,
    }
  ];
  listOfData: User[] = [];

  constructor(private http: UserService, private message: NzMessageService) {
  }

  ngOnInit(): void {
    this.reload();
  }

  reload(): void {
    this.http.getUserList().subscribe(
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

  delete(id): void {
    this.http.deleteUserBySuperAdmin(id).subscribe(
      res => {
        this.reload();
        this.message.success('A User is deleted!!');
      },
      err => {
        this.message.error(err.error.res);
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

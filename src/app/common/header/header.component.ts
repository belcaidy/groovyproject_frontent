import {Component, OnInit} from '@angular/core';
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public service: UserService) {
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.service.logout();
    window.location.href = '/login';
  }

  gotoDashboard(): void {
    // this.service.logout();
    window.location.href = '/welcome';
  }

}

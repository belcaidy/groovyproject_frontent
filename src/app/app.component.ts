import {Component} from '@angular/core';
import {UserService} from './service/user.service';
import {ActivatedRoute, Router} from "@angular/router";
import {Spinkit} from 'ng-http-loader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isCollapsed = false;
  url = '';
  loader = true;
  public spinkit = Spinkit;
  constructor(public userService: UserService, private router: Router, private activatedRoute: ActivatedRoute) {

    setTimeout(() => {                           // <<<---using ()=> syntax
      this.loader = true;
    }, 5000);

    this.url = window.location.pathname;
    console.log(window.location.pathname); //  /routename
    // router.events.subscribe((url:any) => console.log(url));


    userService.getRole();
  }

  logout(): void {
    this.userService.logout();
    this.router.navigateByUrl("/")
  }
}

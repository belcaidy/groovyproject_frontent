import {Component, OnInit} from '@angular/core';
import {NzButtonSize} from 'ng-zorro-antd/button';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  isCollapsed = false;
  size: NzButtonSize = 'large';

  constructor() {
  }

  ngOnInit(): void {
  }

}

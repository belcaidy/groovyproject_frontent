import { Component, Input, OnInit } from '@angular/core';
import { MessageObject } from './model/message-object.model';

@Component({
  selector   : 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls  : ['./notify.component.scss']
})
export class NotifyComponent implements OnInit {

  @Input()
  messageObj: MessageObject = {title: '', content: '', icon: ''};

  constructor() { }

  ngOnInit(): void {
  }

}

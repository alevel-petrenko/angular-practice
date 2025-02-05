import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MessagesService } from './messages.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
  standalone: false
})
export class MessagesComponent implements OnInit {
  showMessage = false;
  messages$: Observable<string[]>;

  constructor(public messagesService: MessagesService) {
    console.log('Created MessagesComponent!');
  }

  ngOnInit() {
    this.messages$ = this.messagesService.messages$
      .pipe(
        tap(() => this.showMessage = true)
      );
  }

  onClose() {
    this.showMessage = false;
  }
}

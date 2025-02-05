import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { filter } from "rxjs/operators";

Injectable();
export class MessagesService {
    private messageSubject = new BehaviorSubject<string[]>([]);

    messages$ = this.messageSubject.asObservable()
        .pipe(
            filter(messages => messages && messages.length > 0)
        )

    showMessages(...messages: string[]) {
        this.messageSubject.next(messages);
    }
}
import {Component, OnInit} from '@angular/core';
import { LoadingComponent } from './loading/loading.component';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false,
    providers: [LoadingComponent]
})
export class AppComponent implements  OnInit {

    constructor() {

    }

    ngOnInit() {
    }

  logout() {

  }

}

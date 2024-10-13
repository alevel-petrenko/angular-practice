import { Component } from '@angular/core';
import { Course } from './model/course';
import { COURSES } from '../db-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  coreCourse: Course = COURSES[0];
  rxjsCourse: Course = COURSES[1];
  ngrxCourse: Course = COURSES[2];


  onMyCustomClick(course: Course) {
    console.log('event fired in card component', course);
  }
}

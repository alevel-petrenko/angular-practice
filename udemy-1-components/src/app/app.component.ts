import { AfterViewInit, Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Course } from './model/course';
import { COURSES } from '../db-data';
import { CourseCardComponent } from './course-card/course-card.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  courses: Course[] = COURSES;

  @ViewChild('logoRef') logo: ElementRef;
  @ViewChildren('cardRef') cards: QueryList<CourseCardComponent>;
  // @ViewChild('cardRef', {read: ElementRef}) card: ElementRef;

  ngAfterViewInit(): void {
    console.log('logo ViewChild', this.logo);
    console.log('cards', this.cards)
  }

  onMyCustomClick(course: Course) {
    console.log('event fired in card component', course);
  }
}

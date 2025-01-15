import { Component, OnInit } from '@angular/core';
import { Course, sortCoursesBySeqNo } from '../model/course';
import { map } from 'rxjs/operators';
import { CoursesService } from '../services/courses.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: false
})
export class HomeComponent implements OnInit {
  beginnerCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;

  constructor(
    private coursesService: CoursesService) {
  }

  ngOnInit() {
    const allCourses$ = this.coursesService.loadAllCourses()
      .pipe(
        map(courses => courses.sort(sortCoursesBySeqNo))
      );
    this.beginnerCourses$ = allCourses$.pipe(
      map(courses => courses.filter(course => course.category === "BEGINNER")));
    this.advancedCourses$ = allCourses$.pipe(
      map(courses => courses.filter(course => course.category === "ADVANCED")));

    console.log('HomeComponent initialized!')
  }
}
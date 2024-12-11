import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, Inject, OnDestroy, OnInit } from '@angular/core';
import { Course } from './model/course';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppConfig, Config_Token } from 'src/config';
import { COURSES } from 'src/db-data';
import { CoursesService } from './courses/services/courses.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  public allCourses: Course[];
  public allCourses$: Observable<Course[]>;

  constructor(private coursesService: CoursesService) {
    console.log('constructor');
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy');
  }

  ngOnInit() {
    console.log('ngOnInit');

    this.coursesService.loadCourses()
      .subscribe(courses => {
        this.allCourses = courses
      })
  }

  onCleared() {
    // this.allCourses = undefined;
    var newCourse = {...this.allCourses[0], description:'My desc'}
    this.allCourses[0] = newCourse;
  }

  save(course: Course) {
    this.coursesService.saveCourse(course)
      .subscribe(() => {
        console.log('Course saved successfully');
      });
  }
}

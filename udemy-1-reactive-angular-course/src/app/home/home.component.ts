import { Component, OnInit } from '@angular/core';
import { Course, sortCoursesBySeqNo } from '../model/course';
import { catchError, map } from 'rxjs/operators';
import { CoursesService } from '../services/courses.service';
import { Observable, throwError } from 'rxjs';
import { LoadingService } from '../loading/loading.service';
import { MessagesService } from '../messages/messages.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: false,
})
export class HomeComponent implements OnInit {
  beginnerCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;

  constructor(
    private coursesService: CoursesService,
    private loadingService: LoadingService,
    private messagesService: MessagesService) {
  }

  ngOnInit() {
    this.reloadCourses();
    console.log('HomeComponent initialized!')
  }

  public reloadCourses(): void {
    const allCourses$ = this.coursesService.loadAllCourses()
      .pipe(
        map(courses => courses.sort(sortCoursesBySeqNo)),
        catchError(error => {
          const errorMessage = 'Error during courses loading!';
          this.messagesService.showMessages(errorMessage);
          console.log(errorMessage, error);
          return throwError(error);
        })
      );

    const coursesLoaded$ = this.loadingService.showLoaderUntilCompleted(allCourses$);

    this.beginnerCourses$ = coursesLoaded$.pipe(
      map(courses => courses.filter(course => course.category === "BEGINNER")));
    this.advancedCourses$ = coursesLoaded$.pipe(
      map(courses => courses.filter(course => course.category === "ADVANCED")));
  }
}
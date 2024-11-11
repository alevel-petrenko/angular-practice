import { Component, Inject, OnInit } from '@angular/core';
import { Course } from './model/course';
import { Observable } from 'rxjs';
import { CoursesService } from './services/courses.service';
import { HttpClient } from '@angular/common/http';
import { Courses_Service, coursesServiceProvider } from './providers/courses-service.provider';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    {
      provide: Courses_Service,
      useFactory: coursesServiceProvider,
      deps: [HttpClient]
    }
  ]
})
export class AppComponent implements OnInit {
  public allCourses: Course[];
  public allCourses$: Observable<Course[]>;

  constructor(@Inject(Courses_Service) private coursesService: CoursesService) {
  }

  ngOnInit() {
    this.allCourses$ = this.coursesService.loadCourses();
  }

  save(course: Course) {
    this.coursesService.saveCourse(course)
      .subscribe(() => {
          console.log('Course saved successfully:');
        });
  }
}

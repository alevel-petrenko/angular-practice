import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, Inject, OnInit } from '@angular/core';
import { Course } from './model/course';
import { Observable } from 'rxjs';
import { CoursesService } from './services/courses.service';
import { HttpClient } from '@angular/common/http';
import { Courses_Service, coursesServiceProvider } from './providers/courses-service.provider';
import { AppConfig, Config_Token } from 'src/config';
import { COURSES } from 'src/db-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
  // providers: [
  //   {
  //     provide: Courses_Service,
  //     useFactory: coursesServiceProvider,
  //     deps: [HttpClient]
  //   }
  // ]
})
export class AppComponent implements OnInit, DoCheck {
  public allCourses: Course[];
  public allCourses$: Observable<Course[]>;

  constructor(private coursesService: CoursesService,
    @Inject(Config_Token) private config: AppConfig,
    private cd: ChangeDetectorRef) {
    console.log(`AppConfig is set up on ` + config.apiUrl);
  }

  ngOnInit() {
    this.coursesService.loadCourses()
      .subscribe(courses => {
        this.allCourses = courses
        this.cd.markForCheck();
      })
  }

  ngDoCheck() {
    // this doesn't update all courses on UI due to OnPush limitations
    console.log("Start ngDoCheck");
    this.cd.markForCheck();
  }

  save(course: Course) {
    this.coursesService.saveCourse(course)
      .subscribe(() => {
        console.log('Course saved successfully');
      });
  }
}

import { Component, OnInit, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../model/course';
import { Lesson } from '../model/lesson';
import { combineLatest, Observable } from 'rxjs';
import { CoursesService } from '../services/courses.service';
import { map, tap } from 'rxjs/operators';


interface CourseData {
  course: Course;
  lessons: Lesson[];
}

@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
  standalone: false
})
export class CourseComponent implements OnInit {

  data$: Observable<CourseData>;

  constructor(private route: ActivatedRoute,
    private coursesService: CoursesService
  ) { }

  ngOnInit() {
    const courseId = this.route.snapshot.paramMap.get('courseId');

    const course$ = this.coursesService.loadCourseById(courseId);
    const lessons$ = this.coursesService.loadAllCourseLessons(courseId);

    this.data$ = combineLatest([course$, lessons$])
      .pipe(
        map(([course, lessons]) => {
          return {
            course,
            lessons
          }
        }),
        tap(console.log)
      );
  }
}

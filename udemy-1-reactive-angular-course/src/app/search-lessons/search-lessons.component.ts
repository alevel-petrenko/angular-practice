import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {merge, fromEvent, Observable, concat} from 'rxjs';
import {Lesson} from '../model/lesson';
import { CoursesService } from '../services/courses.service';

@Component({
    selector: 'course',
    templateUrl: './search-lessons.component.html',
    styleUrls: ['./search-lessons.component.css'],
    standalone: false
})
export class SearchLessonsComponent implements OnInit {
  currentLesson: Lesson;
  searchedLessons$: Observable<Lesson[]>;

  onClick(searchValue: string) {
    this.searchedLessons$ = this.coursesService.searchLessons(searchValue);
  }

  constructor(private coursesService: CoursesService) {
  }

  ngOnInit() {

  }

  openLesson(lesson: Lesson) {
    this.currentLesson = lesson;
  }

  onBack() {
    this.currentLesson = null;
  }
}












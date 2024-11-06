import { Component, OnInit } from '@angular/core';
import {Course} from './model/course';
import {Observable} from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public allCourses: Course[];
  public allCourses$: Observable<Course[]>;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    const params = new HttpParams()
      .set('page', '1')
      .set('pageSize', '10');

    this.allCourses$ = this.http.get<Course[]>('/api/courses', { params });

    this.http.get<Course[]>('/api/courses', { params })
      .subscribe(
        (courses:Course[]) => this.allCourses = courses,
        (error) => console.error('Failed to fetch courses:', error)
      );
  }
}

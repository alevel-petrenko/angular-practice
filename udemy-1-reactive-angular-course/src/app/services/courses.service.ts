import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Course } from "../model/course";
import { map, shareReplay } from "rxjs/operators";
import { Lesson } from "../model/lesson";

@Injectable({
    providedIn: 'root'
})

export class CoursesService {
    constructor (private http: HttpClient) {
    }

    public loadAllCourseLessons(courseId: string): Observable<Lesson[]> {
        return this.http.get<Lesson[]>('/api/lessons', {
            params: {
                pageSize: '1000',
                courseId: courseId
            }
        })
        .pipe(
            map(res => res['payload']),
            shareReplay()
        )
    }

    public loadCourseById(courseId: string): Observable<Course> {
        return this.http.get<Course>(`/api/courses/${courseId}`)
            .pipe(
                shareReplay()
            )
    }

    public loadAllCourses(): Observable<Course[]> {
        return this.http.get<Course[]>('/api/courses')
            .pipe(
                map(res => res['payload']),
                // shareReplay({ bufferSize: 1, refCount: true })
                shareReplay(1)
            );
    }

    public saveCourse(courseId: string, changes: Partial<Course>): Observable<any> {
        return this.http.put(`/api/courses/${courseId}`, changes).
            pipe(
                shareReplay()
            );
    }

    public searchLessons(searchValue: string): Observable<Lesson[]> {
        return this.http.get<Lesson[]>('/api/lessons', {
            params: {
                filter: searchValue,
                pageSize: '100'
            }
        })
        .pipe(
            map(res => res['payload']),
            shareReplay()
        )
    }
}
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Course } from "../model/course";
import { map, shareReplay } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})

export class CoursesService {
    constructor (private http: HttpClient) {
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
}
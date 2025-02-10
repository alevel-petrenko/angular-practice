import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of, throwError } from "rxjs";
import { Course, sortCoursesBySeqNo } from "../model/course";
import { catchError, map, tap } from "rxjs/operators";
import { MessagesService } from "../messages/messages.service";
import { LoadingService } from "../loading/loading.service";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class CoursesStore{
    private subject = new BehaviorSubject<Course[]>([]);
    courses$: Observable<Course[]> = this.subject.asObservable();

    constructor(
        private http: HttpClient,
        private loadingService: LoadingService,
        private messagesService: MessagesService
     ) {
        this.loadAllCourses();
    }

    saveCourse(coursesId: string, changes: Partial<Course>): Observable<any> {
        // .pipe(
        //     catchError(err => {
        //         const error = "Couldn't save course!";
        //         console.log('Error:', error);
        //         this.messagesService.showMessages(error);
        //         return throwError(err);
        //     })
        // )
        return of([]);
    }

    filterByCategory(category: string): Observable<Course[]> {
        return this.courses$
            .pipe(
                map(courses => 
                    courses.filter(course => course.category.toLowerCase() === category.toLowerCase())
                    .sort(sortCoursesBySeqNo)
                )
            )
    }

    private loadAllCourses(): void {
        const loadCourses$ = this.http.get<Course[]>('/api/courses')
            .pipe(
                map(courses => courses['payload']),
                catchError(err => {
                    const message = 'Error during fetching courses';
                    console.log(message);
                    this.messagesService.showMessages(message);
                    return throwError(err);
                }),
                tap(courses => this.subject.next(courses))
            );

        this.loadingService.showLoaderUntilCompleted(loadCourses$)
            .subscribe();
    }
}
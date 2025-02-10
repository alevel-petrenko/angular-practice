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

    saveCourse(courseId: string, changes: Partial<Course>): Observable<any> {
        const oldCourses = this.subject.getValue();
        const oldCourseIndex = oldCourses.findIndex(course => course.id === courseId);

        const newCourse: Course = {
            ...oldCourses[oldCourseIndex],
            ...changes
        };

        const newCourses: Course[] = oldCourses.slice(0);
        newCourses[oldCourseIndex] = newCourse;
        this.subject.next(newCourses);

        return this.http.put(`/api/courses/${courseId}`, changes)
            .pipe(
                catchError(err => {
                    const error = "Couldn't save course!";
                    console.log('Error:', error);
                    this.messagesService.showMessages(error);
                    return throwError(err);
                })
            )
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
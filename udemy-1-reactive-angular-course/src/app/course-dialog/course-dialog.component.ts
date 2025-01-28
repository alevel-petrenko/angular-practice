import { AfterViewInit, Component, ElementRef, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Course } from "../model/course";
import moment from 'moment';
import { CoursesService } from '../services/courses.service';
import { LoadingService } from '../loading/loading.service';

@Component({
    selector: 'course-dialog',
    templateUrl: './course-dialog.component.html',
    styleUrls: ['./course-dialog.component.css'],
    standalone: false,
    providers: [LoadingService]
})
export class CourseDialogComponent implements AfterViewInit {

    form: FormGroup;

    course: Course;

    constructor(
        private fb: FormBuilder,
        private coursesService: CoursesService,
        private loadingService: LoadingService,
        private dialogRef: MatDialogRef<CourseDialogComponent>,
        @Inject(MAT_DIALOG_DATA) course: Course) {

        this.course = course;

        this.form = fb.group({
            description: [course.description, Validators.required],
            category: [course.category, Validators.required],
            releasedAt: [moment(), Validators.required],
            longDescription: [course.longDescription, Validators.required]
        });
    }

    ngAfterViewInit() {

    }

    save() {
        const changes = this.form.value;
        this.coursesService.saveCourse(this.course.id, changes)
            .subscribe({
                next: value => {
                    console.log("processed", value);
                    this.dialogRef.close(value);
                },
                error: err => {
                    console.log(err);
                },
                complete: () => {
                    console.log(`course ${this.course.description} is saved!`)
                },
            })
    }

    close() {
        this.dialogRef.close();
    }

}

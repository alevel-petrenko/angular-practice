import {
    AfterContentChecked,
    AfterContentInit,
    AfterViewChecked,
    AfterViewInit,
    Attribute,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    DoCheck,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    QueryList,
    SimpleChanges,
    ViewEncapsulation
} from '@angular/core';
import { Course } from '../../model/course';

@Component({
    selector: 'course-card',
    templateUrl: './course-card.component.html',
    styleUrls: ['./course-card.component.css'],
})
export class CourseCardComponent implements OnInit, OnDestroy, OnChanges, AfterContentInit, AfterContentChecked, AfterViewChecked {
    @Input()
    course: Course;

    @Input()
    cardIndex: number;

    @Output('courseChanged')
    courseEmitter = new EventEmitter<Course>();

    constructor(@Attribute('testType') private type: string, // allows not to track changes
    ) {
        console.log('constructor');
    }

    ngAfterViewChecked(): void {
        console.log('ngAfterViewChecked');
        this.course.description = 'teest';
    }

    ngAfterContentChecked(): void {
        console.log('ngAfterContentChecked');
    }

    ngAfterContentInit(): void {
        console.log('ngAfterContentInit');
    }

    ngOnChanges(changes: SimpleChanges): void {
        console.log('ngOnChanges', changes);
    }

    ngOnDestroy(): void {
        console.log('ngOnDestroy');
      }

    ngOnInit(): void {
        console.log('ngOnInit');
    }

    // onTitleChanged(newtitle: string) {
    //     this.course.description = newtitle;
    // }

    onSaveClicked(description: string) {
        if (this.course) {
            console.log("Course is OK!", this.course);
        }
        console.log(`New description: ${description}`);
        this.courseEmitter.emit({ ...this.course, description });
    }
}

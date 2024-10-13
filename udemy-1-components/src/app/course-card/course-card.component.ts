import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../model/course';

@Component({
  selector: 'course-card',
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css'
})
export class CourseCardComponent {
  @Input({ required: true }) course: Course;
  @Output('myCustomClick') eventEmitter = new EventEmitter<Course>()

  onViewClicked() {
    console.log('event fired in card component');

    this.eventEmitter.emit(this.course);
  }
}

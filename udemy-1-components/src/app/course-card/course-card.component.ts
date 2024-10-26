import { AfterViewInit, Component, ContentChild, ElementRef, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { Course } from '../model/course';
import { CourseImageComponent } from '../course-image/course-image.component';

@Component({
  selector: 'course-card',
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css'
})
export class CourseCardComponent implements AfterViewInit {
  @Input({ required: true }) course: Course;
  @Input() imageTemplate: TemplateRef<any>;
  @Output('myCustomClick') eventEmitter = new EventEmitter<Course>()
  @ContentChild('lessons') lessons: ElementRef;
  @ContentChild(CourseImageComponent) image: CourseImageComponent;

  ngAfterViewInit(): void {
    console.log('lessons', this.lessons);
    console.log('image in Card component', this.image);
  }

  onViewClicked(): void {
    console.log('event fired in card component');

    this.eventEmitter.emit(this.course);
  }

  getCardClasses(): string {
    if (this.course.category === 'BEGINNER')
      return 'beginner';
  }
}

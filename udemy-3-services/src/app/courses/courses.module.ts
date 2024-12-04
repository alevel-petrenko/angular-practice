import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseCardComponent } from './course-card/course-card.component';
import { CourseImageComponent } from './course-image/course-image.component';
import { CoursesService } from './services/courses.service';

@NgModule({
  declarations: [
    CourseCardComponent,
    CourseImageComponent,
  ],
  imports: [CommonModule],
  exports: [
    CourseCardComponent,
    CourseImageComponent,
  ],
  providers: [CoursesService]
})
export class CoursesModule { }

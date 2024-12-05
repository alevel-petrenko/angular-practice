import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseCardComponent } from './course-card/course-card.component';
import { CourseImageComponent } from './course-image/course-image.component';
import { CoursesService } from './services/courses.service';
import { CategoryFilterPipe } from './category-filter.pipe';

@NgModule({
  declarations: [
    CourseCardComponent,
    CourseImageComponent,
    CategoryFilterPipe,
  ],
  imports: [CommonModule],
  exports: [
    CourseCardComponent,
    CourseImageComponent,
    CategoryFilterPipe,
  ],
  providers: [CoursesService]
})
export class CoursesModule { }

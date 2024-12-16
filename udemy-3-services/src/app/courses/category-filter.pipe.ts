import { Pipe, PipeTransform } from "@angular/core";
import { Course } from "../model/course";

@Pipe({
    name: 'categoryFilter',
    standalone: true,
})

export class CategoryFilterPipe implements PipeTransform {
    transform(courses: Course[], category: string): Course[] {
        return courses.filter(c => c.category.toLocaleLowerCase() === category.toLowerCase());
    }
}

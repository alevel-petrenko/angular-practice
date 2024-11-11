import { HttpClient } from "@angular/common/http";
import { CoursesService } from "../services/courses.service";
import { InjectionToken } from "@angular/core";

export function coursesServiceProvider(http: HttpClient): CoursesService {
    return new CoursesService(http);
}

export const Courses_Service = new InjectionToken('Courses_Service');
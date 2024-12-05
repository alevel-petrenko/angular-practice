import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HighlightedDirective } from './directives/highlighted.directive';
import { NgxUnlessDirective } from './directives/ngx-unless.directive';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { CoursesModule } from './courses/courses.module';

@NgModule({ declarations: [
        AppComponent,
        HighlightedDirective,
        NgxUnlessDirective
    ],
    bootstrap: [
        AppComponent],
    imports: [
        BrowserModule,
        CoursesModule,
        BrowserAnimationsModule,
    ],
    providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }

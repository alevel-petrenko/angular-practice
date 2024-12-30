import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'signals-example',
  standalone: true,
  imports: [],
  templateUrl: './signals-example.component.html',
  styleUrl: './signals-example.component.css'
})
export class SignalsExampleComponent {
  counter = signal(0);

  tenXCounter = computed(() => {
    const counter = this.counter();
    return counter * 10; 
  })

  course = signal({
    id: 1,
    title: "The best course"
  })

  courses = signal([
    "Angular For Beginners",
    "Reactive Angular"
  ])

  increment() {
    this.counter.update(val => val + 1);
    this.course.update(course => ({
      ...course,
      title: `The best course updated`
    }));
    this.courses.update(courses => [...courses, "Completely new course"]);
  }
}

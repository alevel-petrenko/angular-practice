import { Component, computed, effect, signal } from '@angular/core';

@Component({
  selector: 'signals-example',
  standalone: true,
  imports: [],
  templateUrl: './signals-example.component.html',
  styleUrl: './signals-example.component.css'
})
export class SignalsExampleComponent {
  constructor(){
    effect(() => {
      const counterValue = this.counter();
      const multipleCounterValue = this.tenXCounter();

      console.log(`Update value: counter is ${counterValue}, multiple is ${multipleCounterValue}.`)
    })
  }

  counter = signal(0);

  tenXCounter = computed(() => {
    // dependencies for derived signals are created during the last `computed` execution
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

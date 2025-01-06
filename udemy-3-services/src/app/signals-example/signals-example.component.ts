import { Component, computed, effect, EffectRef, signal } from '@angular/core';
import { CounterService } from '../services/counter.service';

@Component({
  selector: 'signals-example',
  standalone: true,
  imports: [],
  templateUrl: './signals-example.component.html',
  styleUrl: './signals-example.component.css'
})
export class SignalsExampleComponent {
  effectRef: EffectRef;

  constructor(private counterService: CounterService){
    this.effectRef = effect((onCleanup) => {
      onCleanup(() => {
        console.log("Cleanup's finished!")
      })

      const counterValue = this.counterService.counter();
      const multipleCounterValue = this.tenXCounter();

      console.log(`Updated values: counter is ${counterValue}, multiple is ${multipleCounterValue}.`)
    })
  }

  counter = this.counterService.counter;

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
    this.counterService.increment();
    this.course.update(course => ({
      ...course,
      title: `The best course updated`
    }));
    this.courses.update(courses => [...courses, "Completely new course"]);
  }

  onCleanup() {
    this.effectRef.destroy();
    console.log("onCleanup is called!")
  }
}

import { Injectable, signal } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class CounterService{
    private counterInternal = signal(0);
    public counter = this.counterInternal.asReadonly();

    public increment() {
        this.counterInternal.update(val => val + 1);
    }
}
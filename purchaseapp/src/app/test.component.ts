import { Component, OnInit, Input, OnDestroy, OnChanges, SimpleChanges } from "@angular/core";

@Component({
    selector: "my-app",
    standalone: true,
    template: `<p>Hello, it's a test value</p>`
})

export class TestComponent implements OnInit, OnDestroy {
    @Input() name: string = "";

    constructor(){ console.log("constructor"); }
    ngOnInit() { console.log("onInit"); }
    ngOnDestroy() { console.log("onDestroy"); }

    ngOnChanges(changes: SimpleChanges) {
        for (let propName in changes) {
          let chng = changes[propName];
          let cur  = JSON.stringify(chng.currentValue);
          let prev = JSON.stringify(chng.previousValue);
          console.log(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
        }
    }
}
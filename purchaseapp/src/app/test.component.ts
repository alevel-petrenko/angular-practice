import { Component, OnInit, Input, OnDestroy, SimpleChanges } from "@angular/core";
import { NgClass } from "@angular/common";

@Component({
    selector: "my-app",
    standalone: true,
    imports: [NgClass],
    template: `
        <div [ngClass]="currentClasses">
            Hello, it's a test value {{page}} from test component
        </div>`,
    styles: [
        `.myVerdanaFont{font-size:15; font-family:Verdana;}
        .navyColor{color:navy;}`
    ]
})

export class TestComponent implements OnInit, OnDestroy {
    @Input() name: string = "";
    page: number = 0;
    isVerdana = true;
    isNavy = true;
 
    currentClasses={
        myVerdanaFont: this.isVerdana,
        navyColor: this.isNavy
    }

    next() { this.page++; }
    previous() { this.page--; }

    constructor() { console.log("constructor"); }
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
import { Component, Input } from "@angular/core";

@Component({
    selector: 'child-comp',
    standalone: true,
    styles: `h2 {font-size:30px; color:red;}`,
    template: `<ng-content></ng-content>
        <h2>Here is what I have: {{shittyText}}</h2>`
})
export class ChildComponent {
    shittyText: string = "";

    @Input()
    set shitty(text: string){
        if (text.includes("war")) {
            this.shittyText = text.replace("war", "WAR");
        }
        else
            this.shittyText = `${text} Amen`;
    }
    get shitty() {
        return this.shittyText;
    }
}
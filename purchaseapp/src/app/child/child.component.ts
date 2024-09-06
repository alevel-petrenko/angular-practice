import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector: 'child-comp',
    standalone: true,
    styles: `h2 {font-size:30px; color:red;}`,
    template: `<ng-content></ng-content>
        <h2>Here is what I have: {{_shittyText}}</h2>
        <button (click)="change(true)">+</button>
        <button (click)="change(false)">-</button>`
})
export class ChildComponent {
    _shittyText: string = "";
    @Output() onChanged = new EventEmitter<boolean>();

    change(increase: boolean) {
        this.onChanged.emit(increase);
    }

    @Input()
    set shittyText(text: string){
        if (text.includes("war")) {
            this._shittyText = text.replace("war", "WAR");
        }
        else
            this._shittyText = `${text} Amen`;
    }
    get shittyText() {
        return this._shittyText;
    }
}
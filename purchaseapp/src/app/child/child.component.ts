import { Component, Input, Output, EventEmitter } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { TestComponent } from '../test.component'

@Component({
    selector: 'child-comp',
    standalone: true,
    imports: [FormsModule, TestComponent],
    styles: `h2 {font-size:30px; color:red;}`,
    template: `<ng-content></ng-content>
        <my-app [name]="userName"></my-app>
        <h2>Here is what I have: {{_shittyText}}</h2>
        <input [ngModel]="userName" (ngModelChange)="onNameChange($event)" />`
})
export class ChildComponent {
    _shittyText: string = "";
    @Input() userName:string = "";
    @Output() userNameChange = new EventEmitter<string>();

    onNameChange(name: string){
        this.userName = name;
        this.userNameChange.emit(name);
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
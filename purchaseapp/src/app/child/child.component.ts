import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TestComponent } from '../test.component'
import { HighlightDirective } from '../directive/appHighlight.directive'
import { BoldDirective } from '../directive/bold.directive'

@Component({
    selector: 'child-comp',
    standalone: true,
    imports: [FormsModule, TestComponent, HighlightDirective, BoldDirective],
    styles: `h2 {font-size:30px; color:red;}`,
    templateUrl: './child.component.html'
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
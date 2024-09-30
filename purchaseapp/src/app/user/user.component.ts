import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

class User {
    constructor(public name: string,
        public age: number,
        public company: string) { }
}

@Component({
    selector: "user",
    standalone: true,
    imports: [FormsModule],
    templateUrl: './user.component.html'
})
export class UserComponent {
    newUser = new User("", 18, "Google")

    users: User[] = [];
    companies: string[] = ['Apple', 'Microsoft', 'Google', 'Jetbrains', 'Other'];

    addUser() {
        this.users.push({ ...this.newUser });
    }
}
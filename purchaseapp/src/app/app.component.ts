import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import {ChildComponent} from './child/child.component';

class Item {
  purchase: string;
  done: boolean;
  price: number;

  constructor(purchase: string, price: number) {
    this.purchase = purchase;
    this.price = price;
    this.done = false;
  }
}

@Component({
  selector: "purchase-app",
  standalone: true,
  imports: [FormsModule, ChildComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  message: string = "war is the worst thing on the Earth!";
  name: string = "Tom";
  text: string = "";
  price: number = 0;

  items: Item[] = [
    { purchase: "Bread", done: false, price: 15.9 },
    { purchase: "Butter", done: false, price: 60 },
    { purchase: "Potato", done: true, price: 22.6 },
    { purchase: "Cheese", done: false, price: 310 },
  ];

  addItem(text: string, price: number): void {
    if (text == null || text.trim() == "" || price == null){
        console.log('wtf')
        return;
    }
    this.items.push(new Item(text, price));
  }

  getMaxPrice(): number{
    return Math.max(...this.items.map(item => item.price));
  }
}

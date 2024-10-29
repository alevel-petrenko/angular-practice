import { Directive, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[highlighted]'
})
export class HighlightedDirective {
  @Input('highlighted') isHighlighted: boolean;
  @Output() toHighlight = new EventEmitter();

  constructor() {
    console.log('Highlighted directive is created');
  }

  @HostBinding('class.highlighted')
  get cssClasses() {
    return this.isHighlighted;
  }

  @HostListener('mouseover', ['$event'])
  mouseOver($event) {
    console.log($event);
    this.isHighlighted = true;
    this.toHighlight.emit(this.isHighlighted);
  }

  @HostListener('mouseleave')
  mouseLeave() {
    this.isHighlighted = false;
    this.toHighlight.emit(this.isHighlighted);
  }
}

import { Directive, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[highlighted]',
  exportAs: 'hl'
})
export class HighlightedDirective {
  @Input('highlighted') isHighlighted: boolean;
  @Output() highlightEmitter = new EventEmitter();

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
    this.highlightEmitter.emit(this.isHighlighted);
  }

  @HostListener('mouseleave')
  mouseLeave() {
    this.isHighlighted = false;
    this.highlightEmitter.emit(this.isHighlighted);
  }

  public toggle() {
    this.isHighlighted = !this.isHighlighted;
    this.highlightEmitter.emit(this.isHighlighted);
  }
}

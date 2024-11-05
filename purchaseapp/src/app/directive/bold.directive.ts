import { Directive, ElementRef, Renderer2, Input } from '@angular/core';

@Directive({
    selector: '[bold]',
    standalone: true,
    host: {
        "(mouseenter)": "onMouseEnter()",
        "(mouseleave)": "onMouseLeave()",
    }
})

export class BoldDirective {
    @Input("bold") selectedSize = "22px";
    @Input() defaultSize = "16px";

    constructor(private el: ElementRef, private renderer: Renderer2){
        renderer.setStyle(el.nativeElement, "cursor", "pointer");
    }

    private setFontWeight(val: string) {
        this.renderer.setStyle(this.el.nativeElement, "font-weight", val);
    }

    private setFontSize(val: string) {
        this.renderer.setStyle(this.el.nativeElement, "font-size", val);
    }

    onMouseEnter(){
        this.setFontWeight('bold');
        this.setFontSize(this.selectedSize);
    }

    onMouseLeave(){
        this.setFontWeight('normal');
        this.setFontSize(this.defaultSize);
    }
}
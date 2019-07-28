import { Directive, Input, EventEmitter, ElementRef, Renderer2, Inject } from '@angular/core';

@Directive({
    selector: '[vgInputfocus]'
})
export class FocusDirective {
    @Input('vgInputfocus') focusEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(@Inject(ElementRef) private element: ElementRef, private renderer: Renderer2) {
      this.focusEvent.subscribe(event => {
        console.log("Auto focus was fired", event);
      });
    }
}

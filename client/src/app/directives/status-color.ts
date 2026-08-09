import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2
} from '@angular/core';

@Directive({
  selector: '[appStatusColor]',
  standalone: true
})
export class StatusColorDirective implements OnChanges {

  @Input() status = '';

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnChanges(): void {

    if (this.status === 'Todo') {

      this.renderer.setStyle(
        this.el.nativeElement,
        'background-color',
        '#ef4444'
      );

    } else if (this.status === 'In Progress') {

      this.renderer.setStyle(
        this.el.nativeElement,
        'background-color',
        '#f59e0b'
      );

    } else if (this.status === 'Done') {

      this.renderer.setStyle(
        this.el.nativeElement,
        'background-color',
        '#22c55e'
      );

    }

    this.renderer.setStyle(
      this.el.nativeElement,
      'color',
      'white'
    );

  }

}
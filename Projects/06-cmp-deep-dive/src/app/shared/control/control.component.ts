import { Component, contentChild, ElementRef, input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [],
  templateUrl: './control.component.html',
  styleUrl: './control.component.css',
  encapsulation: ViewEncapsulation.None, // Allow css to affect elements outside scope of this class
  host: {
    class: "control" // Apply class to selected <app-control> host element
  }
})
export class ControlComponent {
  label = input.required<string>();
  // ViewChild alt for projected content (w/Signals) 
  private control = contentChild<ElementRef<HTMLInputElement | HTMLTextAreaElement>>('input'); 
}

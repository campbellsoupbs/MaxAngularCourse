import { Component, DestroyRef, effect, inject, OnDestroy, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-server-status',
  standalone: true,
  imports: [],
  templateUrl: './server-status.component.html',
  styleUrl: './server-status.component.css'
})
export class ServerStatusComponent implements OnInit{
  currentStatus = signal<'online' | 'offline' | 'unknown'>('online') // explicitly define allowed values for string (literal type)
  // private interval?: ReturnType<typeof setInterval>; //set type equal to return type of setInterval()
  private destroyRef = inject(DestroyRef)

  constructor() {
    // Sets up subscription to listen to signals and executes code when
    // signal value changes
    effect(() => {
      console.log(this.currentStatus());
    })
  }
  
  ngOnInit() {
    const intereval = setInterval(() => {
      const rnd = Math.random(); // 0 - 0.999

      if(rnd < 0.5) {
        this.currentStatus.set('online');
      } else if ( rnd < 0.9) {
        this.currentStatus.set('online');
      } else {
        this.currentStatus.set('unknown');
      }
    }, 5000)

    // Modern approach: 
    
    // Set up DestroyRef listener which excecutes some code when
    // component is destroyed 
    this.destroyRef.onDestroy(() => {
      clearInterval(intereval);
    });
  }

  // Old approach:

  // ngOnDestroy(): void {
  //   // Explicitly clearTimeout using id returned from setInterval (NodeJS.Timeout)
  //   // to prevent memory leak
  //   clearTimeout(this.interval); 
  // }
}

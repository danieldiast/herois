import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss']
})
export class SquareComponent {
  rando = Math.random();

  @Input() value: 'X' | 'O';

  // constructor(){
  //   // setInterval(() => this.rando = Math.random(), 4000);

  // }
}

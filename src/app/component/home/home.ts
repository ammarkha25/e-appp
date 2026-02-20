import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',

})
export class Home {
onMouseOver(event: MouseEvent) {
  (event.target as HTMLElement).style.background = "#e3f2fd";
}
onMouseOut(event: MouseEvent) {
  (event.target as HTMLElement).style.background = "";
}

}

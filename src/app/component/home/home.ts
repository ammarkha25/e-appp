import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="card"><h2>Welcome</h2><p class="muted">Home (legacy placeholder)</p></div>`
})
export class Home {}

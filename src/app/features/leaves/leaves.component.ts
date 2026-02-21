import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leaves',
  templateUrl: './leaves.component.html',
  styleUrl: './leaves.component.css'
})
export class LeavesComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    // Initialization logic here
    console.log('LeavesComponent initialized');
  }
}

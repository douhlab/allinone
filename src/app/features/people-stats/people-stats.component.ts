import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-people-stats',
  templateUrl: './people-stats.component.html',
  styleUrl: './people-stats.component.scss'
})
export class PeopleStatsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    // Initialization logic here
    console.log('PeopleStats initialized');
  }
}

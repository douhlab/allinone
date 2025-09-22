import { Component } from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent {
  topMenuItems = [
    { label: 'Notifications', route: '/notifications' },
    { label: 'Profile', route: '/profile' },
    { label: 'Logout', route: '/logout' }
  ];
}

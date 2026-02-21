import { Component } from '@angular/core';
import { AuthService } from '../shared/util/authentication/auth.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent {
  constructor(public auth: AuthService) {}

  topMenuItems = [
    { label: 'Notifications', route: '/notifications' },
    { label: 'Profile', route: '/profile' }
  ];
  logout() {
    this.auth.logout();
  }
}

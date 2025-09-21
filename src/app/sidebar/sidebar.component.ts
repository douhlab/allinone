import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  menuItems = [
    { label: 'Home', route: '/home' },
    { label: 'Dashboard', route: '/dashboard' },
    { label: 'Reports', route: '/reports' },
    { label: 'Settings', route: '/settings' }
  ];
}

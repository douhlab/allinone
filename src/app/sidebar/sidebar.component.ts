import { Component } from '@angular/core';

interface MenuItem {
  label: string;
  route?: string; // route for leaf items
  children?: MenuItem[]; // sub-menu items
  expanded?: boolean; // for toggling
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  menuItems: MenuItem[] = [
    { label: 'Welcome', route: '/welcome' },
    { label: 'Home', route: '/home' },
    { label: 'Dashboard', route: '/dashboard' },
    {
      label: 'Reports',
      route: '/reports',
      children: [
        { label: 'Leaves', route: '/reports/leaves' },
        { label: 'People stats', route: '/reports/people-stats' }
      ],
      expanded: true
    },
    { label: 'Settings', route: '/settings' }
  ];

  toggle(item: MenuItem) {
    item.expanded = !item.expanded;
  }
}

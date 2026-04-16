import {Component, EventEmitter, Input, Output} from '@angular/core';

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
  @Input() isOpen = false;
  @Output() close = new EventEmitter();

  menuItems: MenuItem[] = [
    { label: 'Welcome', route: '/welcome' },
    { label: 'Home', route: '/home' },
    { label: 'Dashboard', route: '/dashboard' },
    { label: 'Charts', route: '/charts' },

    {
      label: 'Reports',
      children: [
        { label: 'Leaves', route: '/reports/leaves' },
        { label: 'People stats', route: '/reports/people-stats' }
      ]
    },

    {
      label: 'Uploads',
      children: [
        { label: 'Azure', route: '/uploads/azure' },
        { label: 'Local', route: '/uploads/local' }
      ]
    }
  ];

  toggle(item: MenuItem) {
    item.expanded = !item.expanded;
  }

  closeSidebar() {
    this.close.emit();
  }
}

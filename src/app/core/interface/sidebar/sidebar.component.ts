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
      expanded: false
    },
    {
      label: 'Uploads',
      route: '/uploads',
      children: [
        { label: 'Upload to Azure', route: '/uploads/azure' },
        { label: 'Upload to Local', route: '/uploads/local' }
      ],
      expanded: false
    },
    {
      label: 'Barcodes/ QRCodes',
      route: '',
      children: [
        { label: 'Generate', route: '/barcodesqrcodes/generate'},
        { label: 'QR code reader', route: '/barcodesqrcodes/read'}
      ]
    }
  ];

  toggle(item: MenuItem) {
    item.expanded = !item.expanded;
  }
}

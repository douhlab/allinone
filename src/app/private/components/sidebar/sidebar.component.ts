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
    { label: 'Home', route: '/app/home' },
    { label: 'Dashboard', route: '/app/dashboard' },
    { label: 'Charts', route: '/app/charts' },

    {
      label: 'Cars',
      children: [
        { label: 'My Cars', route: '/app/cars' },
        { label: 'My car expenses', route: '/app/cars/expenses' }
      ]
    },

    {
      label: 'Reports',
      children: [
        { label: 'Leaves', route: '/app/reports/leaves' },
        { label: 'People stats', route: '/app/reports/people-stats' }
      ]
    },

    {
      label: 'Uploads',
      children: [
        { label: 'Azure', route: '/app/uploads/azure' },
        { label: 'Local', route: '/app/uploads/local' }
      ]
    },

    {
      label: 'Barcode/QRCode',
      children: [
        { label: 'Barcode', route: '/app/barcodesqrcodes/generate' },
        { label: 'Qrcode', route: '/app/qrcodereader' }
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

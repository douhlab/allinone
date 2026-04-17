import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BarcodeComponent} from "../../../features/barcode/barcode.component";
import {QrcodeReaderComponent} from "../../../features/qrcode-reader/qrcode-reader.component";

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
    },

    {
      label: 'Barcode/QRCode',
      children: [
        { label: 'Barcode', route: '/barcodesqrcodes/generate' },
        { label: 'Qrcode', route: '/qrcodereader' }
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

import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {DialogService} from "../../../core/services/dialog/dialog.service";
import {CalculatorComponent} from "../calculator/calculator.component";
import {NotificationComponent} from "../notification/notification.component";
import {ProfileComponent} from "../profile/profile.component";
import {SettingsComponent} from "../settings/settings.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  stats = [
    {label: 'Leaves', value: 0, icon: 'event'},
    {label: 'Files', value: 0, icon: 'folder'},
    {label: 'Storage', value: '0 MB', icon: 'cloud'},
    {label: 'Notifications', value: 0, icon: 'notifications'}
  ];

  features = [
    {label: 'Dashboard', route: '/app/dashboard', icon: 'dashboard'},
    {label: 'Leaves', route: '/app/reports/leaves', icon: 'event_note'},
    {label: 'Uploads', route: '/app/uploads/azure', icon: 'upload'},
    {label: 'QR Code', route: '/app/qrcodereader', icon: 'bar_chart'}
  ];

  recentActivities = [
    {text: 'Uploaded file "report.pdf"', time: '2 min ago'},
    {text: 'Added leave (2 days)', time: '1 hour ago'},
    {text: 'Generated QR code', time: 'Yesterday'}
  ];

  constructor(
    private router: Router,
    private dialogService: DialogService
  ) {
  }

  ngOnInit(): void {
    // TODO: plug real backend later
  }

  // 🔥 QUICK ACTIONS
  openCalculator() {
    this.dialogService.open(CalculatorComponent, 'Calculator');
  }

  openNotifications() {
    this.dialogService.open(NotificationComponent, 'Notifications');
  }

  openProfile() {
    this.dialogService.open(ProfileComponent, 'Profile');
  }

  openSettings() {
    this.dialogService.open(SettingsComponent, 'Settings');
  }

  navigate(route: string) {
    this.router.navigate([route]);
  }
}

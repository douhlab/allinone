import {Component, EventEmitter, Output} from '@angular/core';
import {AuthService} from '../../../auth/services/auth.service';
import {DialogService} from '../../../core/services/dialog/dialog.service';

import {CalculatorComponent} from "../calculator/calculator.component";
import {ProfileComponent} from "../profile/profile.component";
import {SettingsComponent} from "../settings/settings.component";
import {NotificationComponent} from "../notification/notification.component";
import {ComponentType} from "@angular/cdk/portal";

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent {

  @Output() menuClick = new EventEmitter<void>();

  toolsOpen = false;
  componentsMap: Record<string, ComponentType<any>> = {
    calculator: CalculatorComponent,
    notification: NotificationComponent,
    profile: ProfileComponent,
    settings: SettingsComponent
  };
  topMenuItems = [
    {label: 'Calculator', componentKey: 'calculator'},
    {label: 'Notifications', componentKey: 'notification'},
    {label: 'Profile', componentKey: 'profile'},
    {label: 'Settings', componentKey: 'settings'}
  ];

  constructor(
    private dialogService: DialogService,
    public auth: AuthService
  ) {
  }

  toggleSidebar() {
    this.menuClick.emit();
  }

  logout() {
    this.auth.logout();
  }

  toggleTools() {
    this.toolsOpen = !this.toolsOpen;
  }

  openTool(componentKey: string) {
    const component = this.componentsMap[componentKey];

    if (!component) {
      throw new Error(`Component not found for key: ${componentKey}`);
    }

    this.dialogService.open(component, componentKey);

    // close dropdown after selection
    this.toolsOpen = false;
  }
}

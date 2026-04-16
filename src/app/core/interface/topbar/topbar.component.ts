import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../../shared/util/authentication/auth.service';
import { DialogService } from '../../../services/dialog/dialog.service';

import { CalculatorComponent } from "../../../shared/calculator/calculator.component";
import { ProfileComponent } from "../../../shared/profile/profile.component";
import { SettingsComponent } from "../../../shared/settings/settings.component";
import { NotificationComponent } from "../../../shared/notification/notification.component";
import { ComponentType } from "@angular/cdk/portal";

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent {

  @Output() menuClick = new EventEmitter<void>();

  toolsOpen = false;

  constructor(
    private dialogService: DialogService,
    public auth: AuthService
  ) {}

  componentsMap: Record<string, ComponentType<any>> = {
    calculator: CalculatorComponent,
    notification: NotificationComponent,
    profile: ProfileComponent,
    settings: SettingsComponent
  };

  topMenuItems = [
    { label: 'Calculator', componentKey: 'calculator' },
    { label: 'Notifications', componentKey: 'notification' },
    { label: 'Profile', componentKey: 'profile' },
    { label: 'Settings', componentKey: 'settings' }
  ];

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

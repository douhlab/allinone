import {Component, Type} from '@angular/core';
import { AuthService } from '../../../shared/util/authentication/auth.service';
import {CalculatorComponent} from "../../../shared/calculator/calculator.component";
import {ProfileComponent} from "../../../shared/profile/profile.component";
import {SettingsComponent} from "../../../shared/settings/settings.component";
import {NotificationComponent} from "../../../shared/notification/notification.component";
import {ComponentType} from "@angular/cdk/portal";
import {DialogService} from "../../../shared/dialog.service";

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent {
  componentsMap: Record<string, ComponentType<any>>;

  constructor(private dialogService: DialogService, public auth: AuthService) {
    this.componentsMap = {
      calculator: CalculatorComponent,
      notification: NotificationComponent,
      profile: ProfileComponent,
      settings: SettingsComponent
    }
  }

  topMenuItems = [
    { label: 'Calculator', componentKey: 'calculator' },
    { label: 'Notifications', componentKey: 'notification' },
    { label: 'Profile', componentKey: 'profile' },
    { label: 'Settings', componentKey: 'settings' }
  ];

  logout() {
    this.auth.logout();
  }

  openDialog(componentKey: string) {
    const component = this.componentsMap[componentKey];

    if (!component) {
      throw new Error(`Component not found for key: ${componentKey}`);
    }

    this.dialogService.open(component, componentKey)
  }
}

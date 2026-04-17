import { TopbarComponent } from './topbar.component';
import {AuthService} from "../../../shared/util/authentication/auth.service";
import {DialogService} from "../../../services/dialog/dialog.service";
import {CalculatorComponent} from "../../../shared/calculator/calculator.component";
import {ProfileComponent} from "../../../shared/profile/profile.component";
import {SettingsComponent} from "../../../shared/settings/settings.component";
import {NotificationComponent} from "../../../shared/notification/notification.component";

describe('TopbarComponent', () => {
  let component: TopbarComponent;

  let dialogService: jest.Mocked<DialogService>;
  let authService: jest.Mocked<AuthService>;

  beforeEach(() => {
    dialogService = {
      open: jest.fn()
    } as any;

    authService = {
      logout: jest.fn()
    } as any;

    component = new TopbarComponent(dialogService, authService);
  });

  // ---------------- logout ----------------

  it('should call auth.logout', () => {
    component.logout();

    expect(authService.logout).toHaveBeenCalled();
  });

  // ---------------- openDialog valid ----------------

  it('should open calculator dialog', () => {
    component.openTool('calculator');

    expect(dialogService.open).toHaveBeenCalledWith(
      CalculatorComponent,
      'calculator'
    );
  });

  it('should open profile dialog', () => {
    component.openTool('profile');

    expect(dialogService.open).toHaveBeenCalledWith(
      ProfileComponent,
      'profile'
    );
  });

  it('should open settings dialog', () => {
    component.openTool('settings');

    expect(dialogService.open).toHaveBeenCalledWith(
      SettingsComponent,
      'settings'
    );
  });

  it('should open notification dialog', () => {
    component.openTool('notification');

    expect(dialogService.open).toHaveBeenCalledWith(
      NotificationComponent,
      'notification'
    );
  });

  // ---------------- invalid key ----------------

  it('should throw error when component key is invalid', () => {
    expect(() => component.openTool('invalid'))
      .toThrow('Component not found for key: invalid');
  });
});

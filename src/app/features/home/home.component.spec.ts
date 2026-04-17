import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { Router } from '@angular/router';
import { DialogService } from '../../services/dialog/dialog.service';

import { CalculatorComponent } from '../../shared/calculator/calculator.component';
import { NotificationComponent } from '../../shared/notification/notification.component';
import { ProfileComponent } from '../../shared/profile/profile.component';
import { SettingsComponent } from '../../shared/settings/settings.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  const routerMock = {
    navigate: jest.fn()
  };

  const dialogServiceMock = {
    open: jest.fn()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: DialogService, useValue: dialogServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create home component', () => {
    expect(component).toBeTruthy();
  });

  it('should have default stats defined', () => {
    expect(component.stats.length).toBe(4);
    expect(component.stats[0].label).toBe('Leaves');
  });

  it('should have feature list defined', () => {
    expect(component.features.length).toBe(4);
    expect(component.features[1].label).toBe('Leaves');
  });

  it('should navigate to route', () => {
    component.navigate('/leaves');

    expect(routerMock.navigate).toHaveBeenCalledWith(['/leaves']);
  });

  it('should open calculator dialog', () => {
    component.openCalculator();

    expect(dialogServiceMock.open).toHaveBeenCalledWith(
      CalculatorComponent,
      'Calculator'
    );
  });

  it('should open notifications dialog', () => {
    component.openNotifications();

    expect(dialogServiceMock.open).toHaveBeenCalledWith(
      NotificationComponent,
      'Notifications'
    );
  });

  it('should open profile dialog', () => {
    component.openProfile();

    expect(dialogServiceMock.open).toHaveBeenCalledWith(
      ProfileComponent,
      'Profile'
    );
  });

  it('should open settings dialog', () => {
    component.openSettings();

    expect(dialogServiceMock.open).toHaveBeenCalledWith(
      SettingsComponent,
      'Settings'
    );
  });

  it('should not crash on init', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule], // needed for routerLink
      declarations: [SidebarComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have menuItems initialized correctly', () => {
    expect(component.menuItems).toEqual([
      { label: 'Welcome', route: '/welcome' },
      { label: 'Home', route: '/home' },
      { label: 'Dashboard', route: '/dashboard' },
      {
        label: 'Reports',
        route: '/reports',
        children: [
          {
            label: 'Leaves',
            route: '/reports/leaves'
          },
          {
            label: 'People stats',
            route: '/reports/people-stats'
          }
        ],
        expanded: true
      },
      { label: 'Settings', route: '/settings' }
    ]);
  });

  it('should toggle expanded state of a menu item', () => {
    const reportsItem = component.menuItems.find((item) => item.label === 'Reports');
    expect(reportsItem?.expanded).toBe(true);

    component.toggle(reportsItem!);
    expect(reportsItem?.expanded).toBe(false);

    component.toggle(reportsItem!);
    expect(reportsItem?.expanded).toBe(true);
  });

  it('should render submenu items when expanded', () => {
    const reportsItem = component.menuItems.find((item) => item.label === 'Reports');
    reportsItem!.expanded = true;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const submenuLinks = compiled.querySelectorAll('ul.submenu li a');
    expect(submenuLinks.length).toBe(2);
    expect(submenuLinks[0].textContent?.trim()).toBe('Leaves');
  });
});

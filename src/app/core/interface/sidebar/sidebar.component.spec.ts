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

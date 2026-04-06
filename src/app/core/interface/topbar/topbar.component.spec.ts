import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopbarComponent } from './topbar.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('TopbarComponent', () => {
  let component: TopbarComponent;
  let fixture: ComponentFixture<TopbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule], // for routerLink
      declarations: [TopbarComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have topMenuItems initialized correctly', () => {
    expect(component.topMenuItems).toEqual([
      { label: 'Notifications', route: '/notifications' },
      { label: 'Profile', route: '/profile' }
    ]);
  });

  it('should render menu items in the template', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const menuLinks = compiled.querySelectorAll('nav.topnav a');
    expect(menuLinks.length).toBe(component.topMenuItems.length);

    component.topMenuItems.forEach((item, index) => {
      expect(menuLinks[index].textContent?.trim()).toBe(item.label);
    });
  });
});

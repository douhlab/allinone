import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit and log message', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    component.ngOnInit();

    expect(consoleSpy).toHaveBeenCalledWith('Profile initialized');

    consoleSpy.mockRestore();
  });
});

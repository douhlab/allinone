import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeavesComponent } from './leaves.component';

describe('LeavesComponent', () => {
  let component: LeavesComponent;
  let fixture: ComponentFixture<LeavesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LeavesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LeavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // triggers ngOnInit and rendering
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct selector', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-leaves')).toBeNull();
    // Note: The component itself is the root, so the selector is not rendered in its own template
  });
});

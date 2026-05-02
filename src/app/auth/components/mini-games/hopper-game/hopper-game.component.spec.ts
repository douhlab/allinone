import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HopperGameComponent} from './hopper-game.component';

describe('HopperGameComponent', () => {
  let component: HopperGameComponent;
  let fixture: ComponentFixture<HopperGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HopperGameComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HopperGameComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});

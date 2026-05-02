import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PeopleStatsComponent } from './people-stats.component';

describe('PeopleStatsComponent', () => {
  let component: PeopleStatsComponent;
  let fixture: ComponentFixture<PeopleStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PeopleStatsComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleStatsComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit and log message', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    component.ngOnInit();

    expect(consoleSpy).toHaveBeenCalledWith('PeopleStats initialized');

    consoleSpy.mockRestore();
  });
});

import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CalculatorComponent} from './calculator.component';

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalculatorComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should append digits to the equation', () => {
    component.append('1');
    component.append('2');
    expect(component.equation).toBe('12');
  });

  it('should compute result and add to history', () => {
    component.equation = '2+3';
    component.compute();

    expect(component.result).toBe('5');
    expect(component.history[0]).toEqual({ equation: '2+3', result: '5' });
  });

  it('should clear invalid expressions', () => {
    component.equation = '2++';
    component.compute();
    expect(component.result).toBe('');
  });

  it('should replace trailing operator when operating', () => {
    component.equation = '2+';
    component.operate('-');
    expect(component.equation).toBe('2-');
  });

  it('should compute when equals is pressed', () => {
    component.equation = '4*2';
    component.operate('=');
    expect(component.result).toBe('8');
  });

  it('should clear equation and result', () => {
    component.equation = '9';
    component.result = '9';
    component.clear();

    expect(component.equation).toBe('');
    expect(component.result).toBe('');
  });

  it('should delete last character', () => {
    component.equation = '123';
    component.delete();
    expect(component.equation).toBe('12');
  });

  it('should handle keyboard input', () => {
    const preventDefault = jest.fn();
    const keyEvent = (key: string) =>
      ({ key, preventDefault } as unknown as KeyboardEvent);

    component.handleKeyboard(keyEvent('5'));
    component.handleKeyboard(keyEvent('+'));
    component.handleKeyboard(keyEvent('3'));
    component.handleKeyboard(keyEvent('Enter'));

    expect(component.equation).toBe('5+3');
    expect(component.result).toBe('8');
    expect(preventDefault).toHaveBeenCalled();
  });
});

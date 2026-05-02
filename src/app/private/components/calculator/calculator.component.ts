import {Component, HostListener} from '@angular/core';

interface HistoryItem {
  equation: string;
  result: string;
}

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent {
  equation = '';
  result = '';
  history: HistoryItem[] = [];


  append(value: string) {
    this.equation += value;
  }

  operate(operator: string) {
    if (operator === '=') {
      this.compute();
    } else {
      // If last char is an operator, replace it
      if (/[+\-*/]$/.test(this.equation)) {
        this.equation = this.equation.slice(0, -1);
      }
      this.equation += operator;
      this.compute(); // optional: you can compute running result here
    }
  }

  compute() {
    try {
      const res = Function(`return ${this.equation}`)();
      this.result = res.toString();

      if (this.equation.trim() !== '') {
        this.history.unshift({ equation: this.equation, result: this.result });
      }
    } catch {
      this.result = '';
    }
  }

  clear() {
    this.equation = '';
    this.result = '';
  }

  delete() {
    this.equation = this.equation.slice(0, -1);
  }

  // Keyboard support
  @HostListener('window:keydown', ['$event'])
  handleKeyboard(event: KeyboardEvent) {
    const key = event.key;

    if (key >= '0' && key <= '9') {
      this.append(key);
    } else if (['+', '-', '*', '/'].includes(key)) {
      this.operate(key);
    } else if (key === 'Enter') {
      this.operate('=');
    } else if (key === 'Backspace') {
      this.delete();
    } else if (key === 'Escape') {
      this.clear();
    }

    event.preventDefault();
  }
}

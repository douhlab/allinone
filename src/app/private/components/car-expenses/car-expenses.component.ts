import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {CarExpense} from '../../models/car-expense';
import {CarExpenseService} from '../../services/car/car-expense.service';
import {CarExpenseDialogComponent} from './car-expense-dialog/car-expense-dialog.component';
import {CarExpenseCreationRequest} from '../../models/car-expense-creation-request';
import {FORM_DIALOG_CONFIG} from '../../../core/services/dialog/dialog.service';

@Component({
  selector: 'app-car-expenses',
  templateUrl: './car-expenses.component.html',
  styleUrl: './car-expenses.component.css'
})
export class CarExpensesComponent implements OnInit {

  columns = [
    'car',
    'type',
    'description',
    'amountInUsd',
    'serviceStation',
    'mainOdometer',
    'dateHappened',
    'fuelEvent',
    'note'
  ];

  dataSource = new MatTableDataSource<CarExpense>([]);

  constructor(
    private carExpenseService: CarExpenseService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadExpenses();
  }

  loadExpenses(): void {
    this.carExpenseService.getAllExpenses().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CarExpenseDialogComponent, {
      ...FORM_DIALOG_CONFIG,
      width: '640px'
    });

    dialogRef.afterClosed().subscribe((result: CarExpenseCreationRequest | undefined) => {
      if (result) {
        this.carExpenseService.createExpense(result).subscribe(saved => {
          this.dataSource.data = [...this.dataSource.data, saved];
        });
      }
    });
  }

  formatFuelEvent(expense: CarExpense): string {
    if (!expense.fuelEvent) {
      return '—';
    }

    const {fuelType, refillAmountInLiter, mileageTraversed} = expense.fuelEvent;
    return `${fuelType} · ${refillAmountInLiter}L · ${mileageTraversed} mi`;
  }
}

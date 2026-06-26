import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {Car} from '../../models/car';
import {CarService} from '../../services/car/car.service';
import {CarDialogComponent} from './car-dialog/car-dialog.component';
import {CarCreationRequest} from '../../models/car-creation-request';
import {FORM_DIALOG_CONFIG} from '../../../core/services/dialog/dialog.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrl: './cars.component.css'
})
export class CarsComponent implements OnInit {

  columns = [
    'name',
    'model',
    'modelYear',
    'ownedDate',
    'odometerWhenOwned',
    'priceInUsdWhenOwned',
    'note'
  ];

  dataSource = new MatTableDataSource<Car>([]);

  constructor(
    private carService: CarService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadCars();
  }

  loadCars(): void {
    this.carService.getAllCars().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CarDialogComponent, FORM_DIALOG_CONFIG);

    dialogRef.afterClosed().subscribe((result: CarCreationRequest | undefined) => {
      if (result) {
        this.carService.createCar(result).subscribe(saved => {
          this.dataSource.data = [...this.dataSource.data, saved];
        });
      }
    });
  }
}

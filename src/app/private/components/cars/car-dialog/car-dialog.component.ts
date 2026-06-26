import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {APP_DIALOG_OVERLAY_CLASS} from '../../../../core/services/dialog/dialog.service';
import {CarCreationRequest} from '../../../models/car-creation-request';

@Component({
  selector: 'app-car-dialog',
  templateUrl: './car-dialog.component.html',
  styleUrl: './car-dialog.component.scss'
})
export class CarDialogComponent {

  readonly overlayPanelClass = APP_DIALOG_OVERLAY_CLASS;

  form = this.fb.group({
    name: ['', Validators.required],
    model: ['', Validators.required],
    modelYear: [new Date().getFullYear(), [Validators.required, Validators.min(1900)]],
    ownedDate: [null as Date | null, Validators.required],
    odometerWhenOwned: [0, [Validators.required, Validators.min(0)]],
    priceInUsdWhenOwned: [0, [Validators.required, Validators.min(0)]],
    note: ['']
  });

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CarDialogComponent>
  ) {}

  submit(): void {
    if (this.form.invalid) {
      return;
    }

    const value = this.form.getRawValue();
    const ownedDate = value.ownedDate;

    const request: CarCreationRequest = {
      name: value.name!,
      model: value.model!,
      modelYear: value.modelYear!,
      ownedDate: this.formatDate(ownedDate),
      odometerWhenOwned: value.odometerWhenOwned!,
      priceInUsdWhenOwned: value.priceInUsdWhenOwned!,
      note: value.note || undefined
    };

    this.dialogRef.close(request);
  }

  close(): void {
    this.dialogRef.close();
  }

  private formatDate(date: Date | null): string {
    if (!date) {
      return '';
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}

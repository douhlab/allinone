import {Component} from "@angular/core";
import {FormBuilder, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {LeaveService} from "../../../services/leave/leave.service";
import {AuthService} from "../../../../auth/services/auth.service";
import {APP_DIALOG_OVERLAY_CLASS} from "../../../../core/services/dialog/dialog.service";

@Component({
  selector: 'app-leave-dialog',
  templateUrl: './leave-dialog.component.html',
  styleUrl: './leave-dialog.component.scss'
})
export class LeaveDialogComponent {

  readonly overlayPanelClass = APP_DIALOG_OVERLAY_CLASS;

  form = this.fb.group({
    employer: [0, Validators.required],
    leaveDate: ['', Validators.required],
    days: [1, Validators.required],
    currentBalance: [0],
    description: [''],
    note: ['']
  });

  userId: number;
  employers$ = this.leaveService.getEmployers();

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<LeaveDialogComponent>,
    private leaveService: LeaveService
  ) {

    this.auth.user$.subscribe(user => {
      this.userId = user?.id ?? 1;
    });
  }

  submit() {
    if (this.form.invalid) return;
    let leaveRecordCreationRequest = {
      userId: this.userId,
      employerId: this.form.value.employer,
      dateHappened: this.form.value.leaveDate,
      numberOfDays: this.form.value.days,
      description: this.form.value.description,
      currentBalance: this.form.value.currentBalance,
      note: this.form.value.note
    };
    this.dialogRef.close(leaveRecordCreationRequest);
  }

  close() {
    this.dialogRef.close();
  }
}

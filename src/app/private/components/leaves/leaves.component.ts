import {Component, OnInit} from '@angular/core';
import {LeaveRecord} from "../../services/leave/leave-record";
import {MatTableDataSource} from "@angular/material/table";
import {LeaveService} from "../../services/leave/leave.service";
import {MatDialog} from "@angular/material/dialog";
import {LeaveDialogComponent} from "./leave-dialog/leave-dialog.component";
import {LeaveRecordCreationRequest} from "../../services/leave/leave-record-creation-request";
import {ConfirmDialogComponent} from "../../../core/components/confirm-dialog/confirm-dialog.component";
import {AuthService} from "../../../auth/services/auth.service";

@Component({
  selector: 'app-leaves',
  templateUrl: './leaves.component.html',
  styleUrl: './leaves.component.css'
})
export class LeavesComponent implements OnInit {
  userId: number;

  columns = ['employer', 'leaveDate', 'days', 'currentBalance', 'description', 'actions'];

  dataSource = new MatTableDataSource<LeaveRecord>([]);

  constructor(
    private auth: AuthService,
    private leaveService: LeaveService,
    private dialog: MatDialog
  ) {
    this.auth.user$.subscribe(user => {
      this.userId = user?.id ?? 1;
    });
  }

  ngOnInit() {
    this.loadLeaves();
  }

  loadLeaves() {
    this.leaveService.getLeaves(this.userId).subscribe(data => {
      this.dataSource.data = data;
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(LeaveDialogComponent);

    dialogRef.afterClosed().subscribe((result: LeaveRecordCreationRequest | undefined) => {
      if (result) {
        this.leaveService.createLeave(result).subscribe(saved => {
          this.dataSource.data = [...this.dataSource.data, saved];
        });
      }
    });
  }

  delete(row: any) {
    this.leaveService.deleteLeave(row.id).subscribe(() => {
      // remove from UI immediately (better UX)
      this.dataSource.data = this.dataSource.data.filter(r => r.id !== row.id);
    });
  }

  openConfirmDialog(row: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {message: 'Are you sure you want to delete this record?', title: 'Confirm', confirmText: 'Delete'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete(row);
      }
    });
  }

}

import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogShellComponent } from '../../core/interface/dialog-shell/dialog-shell.component';

@Injectable({ providedIn: 'root' })
export class DialogService {

  constructor(private dialog: MatDialog) {}

  open(component: any, title: string) {
    return this.dialog.open(DialogShellComponent, {
      data: { component, title },
      hasBackdrop: true,
      autoFocus: false,
      width: 'auto',
      minWidth: '400px',
      maxWidth: '1000px',
      disableClose: true
    });
  }
}

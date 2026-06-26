import {Injectable} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {DialogShellComponent} from '../../components/dialog-shell/dialog-shell.component';

export const APP_DIALOG_PANEL_CLASS = 'app-dialog-panel';
export const APP_DIALOG_OVERLAY_CLASS = 'app-dialog-overlay';

export const FORM_DIALOG_CONFIG: MatDialogConfig = {
  panelClass: APP_DIALOG_PANEL_CLASS,
  width: '560px',
  maxWidth: '95vw',
  autoFocus: true
};

export const CONFIRM_DIALOG_CONFIG: MatDialogConfig = {
  panelClass: APP_DIALOG_PANEL_CLASS,
  width: '420px',
  maxWidth: '95vw',
  autoFocus: true
};

@Injectable({providedIn: 'root'})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  open(component: any, title: string, config: MatDialogConfig = {}) {
    return this.dialog.open(DialogShellComponent, {
      ...config,
      data: {component, title},
      hasBackdrop: true,
      autoFocus: config.autoFocus ?? false,
      width: config.width ?? 'auto',
      maxWidth: config.maxWidth ?? '95vw',
      disableClose: config.disableClose ?? true,
      panelClass: [APP_DIALOG_PANEL_CLASS, 'app-dialog-shell-panel', ...(this.asPanelClasses(config.panelClass))]
    });
  }

  private asPanelClasses(panelClass?: string | string[]): string[] {
    if (!panelClass) {
      return [];
    }

    return Array.isArray(panelClass) ? panelClass : [panelClass];
  }
}

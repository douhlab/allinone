// private.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIcon} from "@angular/material/icon";
import {
  MatCell,
  MatCellDef,
  MatColumnDef, MatFooterCell, MatFooterCellDef, MatFooterRow, MatFooterRowDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable
} from "@angular/material/table";
import {MatButton, MatIconButton} from "@angular/material/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxEchartsDirective} from "ngx-echarts";
import {TranslateModule} from "@ngx-translate/core";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import {MatFormField, MatInput, MatInputModule, MatLabel} from "@angular/material/input";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatDialogActions, MatDialogContent, MatDialogModule, MatDialogTitle} from "@angular/material/dialog";
import {CdkDrag, CdkDragHandle, DragDropModule} from "@angular/cdk/drag-drop";
import {MatNativeDateModule} from "@angular/material/core";
import {ToastComponent} from "./interface/toast/toast.component";
import {TopbarComponent} from "./interface/topbar/topbar.component";
import {SidebarComponent} from "./interface/sidebar/sidebar.component";
import {ForbiddenComponent} from "./interface/forbidden/forbidden.component";
import {DialogShellComponent} from "./interface/dialog-shell/dialog-shell.component";
import {ConfirmDialogComponent} from "./interface/confirm-dialog/confirm-dialog.component";
import {PrivateRoutingModule} from "../private/private-routing.module";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    ToastComponent,
    TopbarComponent,
    SidebarComponent,
    ForbiddenComponent,
    DialogShellComponent,
    ConfirmDialogComponent,
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    MatIcon,
    MatCell,
    MatIconButton,
    MatCellDef,
    MatHeaderCell,
    MatColumnDef,
    MatHeaderCellDef,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatHeaderRowDef,
    MatButton,
    MatTable,
    FormsModule,
    NgxEchartsDirective,
    MatFooterCell,
    MatFooterCellDef,
    TranslateModule,
    MatFooterRow,
    MatFooterRowDef,
    MatDatepickerToggle,
    MatInput,
    MatLabel,
    MatFormField,
    MatDatepickerInput,
    MatDatepicker,
    MatSelect,
    MatOption,
    ReactiveFormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    CdkDrag,
    CdkDragHandle,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule
  ],
  exports: [
  // Export so other modules can use them
  ConfirmDialogComponent,
  DialogShellComponent,
  SidebarComponent,
  ToastComponent,
  TopbarComponent,

  // Also export modules needed in templates
  RouterModule,
  MatDialogModule,
  DragDropModule
]
})
export class CoreModule {}

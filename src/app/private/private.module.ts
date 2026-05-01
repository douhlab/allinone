// private.module.ts
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PrivateRoutingModule} from './private-routing.module';
import {HomeComponent} from "./home/home.component";
import {BarcodeComponent} from "./barcode/barcode.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ChartPlaygroundComponent} from "./chart-playground/chart-playground.component";
import {LeavesComponent} from "./leaves/leaves.component";
import {PeopleStatsComponent} from "./people-stats/people-stats.component";
import {QrcodeReaderComponent} from "./qrcode-reader/qrcode-reader.component";
import {UploadLocalComponent} from "./upload-local/upload-local.component";
import {UploadAzureComponent} from "./upload-azure/upload-azure.component";
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
import {NgxEchartsDirective, NgxEchartsModule} from "ngx-echarts";
import {TranslateModule} from "@ngx-translate/core";
import {LeaveDialogComponent} from "./leaves/leave-dialog/leave-dialog.component";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import {MatFormField, MatInput, MatInputModule, MatLabel} from "@angular/material/input";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatDialogActions, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {CdkDrag, CdkDragHandle} from "@angular/cdk/drag-drop";
import {MatNativeDateModule} from "@angular/material/core";
import {CoreModule} from "../core/core.module";
import {QRCodeModule} from "angularx-qrcode";
import {MainLayoutComponent} from "./main-layout/main-layout.component";

@NgModule({
  declarations: [
    HomeComponent,
    BarcodeComponent,
    DashboardComponent,
    ChartPlaygroundComponent,
    LeavesComponent,
    PeopleStatsComponent,
    QrcodeReaderComponent,
    UploadAzureComponent,
    UploadLocalComponent,
    LeaveDialogComponent,
    MainLayoutComponent
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    CoreModule,
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
    MatNativeDateModule,
    QRCodeModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    TranslateModule
  ],
  providers: []
})
export class PrivateModule {
}

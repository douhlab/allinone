// private.module.ts
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PrivateRoutingModule} from './private-routing.module';
import {HomeComponent} from "./components/home/home.component";
import {BarcodeComponent} from "./components/barcode/barcode.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {ChartPlaygroundComponent} from "./components/chart-playground/chart-playground.component";
import {LeavesComponent} from "./components/leaves/leaves.component";
import {CarsComponent} from "./components/cars/cars.component";
import {CarExpensesComponent} from "./components/car-expenses/car-expenses.component";
import {PeopleStatsComponent} from "./components/people-stats/people-stats.component";
import {QrcodeReaderComponent} from "./components/qrcode-reader/qrcode-reader.component";
import {UploadLocalComponent} from "./components/upload-local/upload-local.component";
import {UploadAzureComponent} from "./components/upload-azure/upload-azure.component";
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
import {LeaveDialogComponent} from "./components/leaves/leave-dialog/leave-dialog.component";
import {CarDialogComponent} from "./components/cars/car-dialog/car-dialog.component";
import {CarExpenseDialogComponent} from "./components/car-expenses/car-expense-dialog/car-expense-dialog.component";
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
import {MainLayoutComponent} from "./components/main-layout/main-layout.component";
import {TopbarComponent} from "./components/topbar/topbar.component";
import {SidebarComponent} from "./components/sidebar/sidebar.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {SettingsComponent} from "./components/settings/settings.component";
import {CalculatorComponent} from "./components/calculator/calculator.component";

@NgModule({
  declarations: [
    HomeComponent,
    BarcodeComponent,
    DashboardComponent,
    ChartPlaygroundComponent,
    LeavesComponent,
    CarsComponent,
    CarExpensesComponent,
    PeopleStatsComponent,
    QrcodeReaderComponent,
    UploadAzureComponent,
    UploadLocalComponent,
    LeaveDialogComponent,
    CarDialogComponent,
    CarExpenseDialogComponent,
    MainLayoutComponent,
    TopbarComponent,
    SidebarComponent,
    ProfileComponent,
    SettingsComponent,
    CalculatorComponent
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

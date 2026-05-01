// private-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {CalculatorComponent} from "../shared/calculator/calculator.component";
import {NotificationComponent} from "../shared/notification/notification.component";
import {ProfileComponent} from "../shared/profile/profile.component";
import {SettingsComponent} from "../shared/settings/settings.component";
import {HomeComponent} from "./home/home.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ChartPlaygroundComponent} from "./chart-playground/chart-playground.component";
import {LeavesComponent} from "./leaves/leaves.component";
import {PeopleStatsComponent} from "./people-stats/people-stats.component";
import {UploadAzureComponent} from "./upload-azure/upload-azure.component";
import {UploadLocalComponent} from "./upload-local/upload-local.component";
import {BarcodeComponent} from "./barcode/barcode.component";
import {QrcodeReaderComponent} from "./qrcode-reader/qrcode-reader.component";
import {MainLayoutComponent} from "./main-layout/main-layout.component";

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      // { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'charts', component: ChartPlaygroundComponent },
      { path: 'reports/leaves', component: LeavesComponent },
      { path: 'reports/people-stats', component: PeopleStatsComponent },
      { path: 'uploads/azure', component: UploadAzureComponent },
      { path: 'uploads/local', component: UploadLocalComponent },
      { path: 'barcodesqrcodes/generate', component: BarcodeComponent },
      { path: 'qrcodereader', component: QrcodeReaderComponent },
      { path: 'tools/calculator', component: CalculatorComponent},
      { path: 'tools/notifications', component: NotificationComponent},
      { path: 'tools/profile', component: ProfileComponent},
      { path: 'tools/settings', component: SettingsComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule {}

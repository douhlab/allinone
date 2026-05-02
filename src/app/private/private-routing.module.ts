// private-routing.module.ts
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {CalculatorComponent} from "./components/calculator/calculator.component";
import {NotificationComponent} from "./components/notification/notification.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {SettingsComponent} from "./components/settings/settings.component";
import {HomeComponent} from "./components/home/home.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {ChartPlaygroundComponent} from "./components/chart-playground/chart-playground.component";
import {LeavesComponent} from "./components/leaves/leaves.component";
import {PeopleStatsComponent} from "./components/people-stats/people-stats.component";
import {UploadAzureComponent} from "./components/upload-azure/upload-azure.component";
import {UploadLocalComponent} from "./components/upload-local/upload-local.component";
import {BarcodeComponent} from "./components/barcode/barcode.component";
import {QrcodeReaderComponent} from "./components/qrcode-reader/qrcode-reader.component";
import {MainLayoutComponent} from "./components/main-layout/main-layout.component";

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {path: '', component: HomeComponent},
      {path: 'home', component: HomeComponent},
      // { path: '', redirectTo: 'home', pathMatch: 'full' },
      {path: 'dashboard', component: DashboardComponent},
      {path: 'charts', component: ChartPlaygroundComponent},
      {path: 'reports/leaves', component: LeavesComponent},
      {path: 'reports/people-stats', component: PeopleStatsComponent},
      {path: 'uploads/azure', component: UploadAzureComponent},
      {path: 'uploads/local', component: UploadLocalComponent},
      {path: 'barcodesqrcodes/generate', component: BarcodeComponent},
      {path: 'qrcodereader', component: QrcodeReaderComponent},
      {path: 'tools/calculator', component: CalculatorComponent},
      {path: 'tools/notifications', component: NotificationComponent},
      {path: 'tools/profile', component: ProfileComponent},
      {path: 'tools/settings', component: SettingsComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule {
}

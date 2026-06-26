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
import {CarsComponent} from "./components/cars/cars.component";
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
      {path: '', component: HomeComponent, data: {title: 'Home', skipLayoutTitle: true}},
      {path: 'home', component: HomeComponent, data: {title: 'Home', skipLayoutTitle: true}},
      {path: 'dashboard', component: DashboardComponent, data: {title: 'Dashboard'}},
      {path: 'charts', component: ChartPlaygroundComponent, data: {title: 'Charts'}},
      {path: 'reports/leaves', component: LeavesComponent, data: {title: 'Leaves', skipLayoutTitle: true}},
      {path: 'cars', component: CarsComponent, data: {title: 'Cars', skipLayoutTitle: true}},
      {path: 'reports/people-stats', component: PeopleStatsComponent, data: {title: 'People Stats'}},
      {path: 'uploads/azure', component: UploadAzureComponent, data: {title: 'Azure Upload'}},
      {path: 'uploads/local', component: UploadLocalComponent, data: {title: 'Local Upload'}},
      {path: 'barcodesqrcodes/generate', component: BarcodeComponent, data: {title: 'Barcode / QR Code'}},
      {path: 'qrcodereader', component: QrcodeReaderComponent, data: {title: 'QR Code Reader'}},
      {path: 'tools/calculator', component: CalculatorComponent, data: {title: 'Calculator'}},
      {path: 'tools/notifications', component: NotificationComponent, data: {title: 'Notifications'}},
      {path: 'tools/profile', component: ProfileComponent, data: {title: 'Profile'}},
      {path: 'tools/settings', component: SettingsComponent, data: {title: 'Settings'}}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule {
}

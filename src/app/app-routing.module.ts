import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/authentication/login/login.component';
import { HomeComponent } from './features/home/home.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { AuthGuard } from 'src/app/shared/util/authentication/auth.guard';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { LeavesComponent } from './features/leaves/leaves.component';
import { SettingsComponent } from './shared/settings/settings.component';
import { ProfileComponent } from './shared/profile/profile.component';
import { PeopleStatsComponent } from './features/people-stats/people-stats.component';
import { UploadLocalComponent } from './features/upload-local/upload-local.component';
import { UploadAzureComponent } from './features/upload-azure/upload-azure.component';
import {BarcodeComponent} from "./features/barcode/barcode.component";
import {CalculatorComponent} from "./shared/calculator/calculator.component";
import {QrcodeReaderComponent} from "./features/qrcode-reader/qrcode-reader.component";
import {ChartPlaygroundComponent} from "./features/chart-playground/chart-playground.component";
import {RegistrationComponent} from "./core/authentication/registration/registration.component";
import {ForbiddenComponent} from "./core/interface/forbidden/forbidden.component";
import {NotificationComponent} from "./shared/notification/notification.component";

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: HomeComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
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
      { path: 'tools/settings', component: SettingsComponent},
    ]
  },

  { path: '', component: AuthLayoutComponent, children: [
      {path: 'login', component: LoginComponent },
      {path: 'register', component: RegistrationComponent },
      {path: 'forbidden', component: ForbiddenComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

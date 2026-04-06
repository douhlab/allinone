import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/authentication/login/login.component';
import { HomeComponent } from './features/home/home.component';
import { WelcomeComponent } from './features/welcome/welcome.component';
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

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: HomeComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'welcome', component: WelcomeComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'reports/leaves', component: LeavesComponent },
      { path: 'reports/people-stats', component: PeopleStatsComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'uploads/azure', component: UploadAzureComponent },
      { path: 'uploads/local', component: UploadLocalComponent },
      { path: 'barcodesqrcodes/generate', component: BarcodeComponent },
      { path: 'calculator', component: CalculatorComponent},
    ]
  },

  { path: '', component: AuthLayoutComponent, children: [{ path: 'login', component: LoginComponent }] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

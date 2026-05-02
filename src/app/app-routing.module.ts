import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from 'src/app/auth/guard/auth.guard';
import {ErrorPageComponent} from "./core/components/error-page/error-page.component";

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./public/public.module').then(m => m.PublicModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'app',
    loadChildren: () => import('./private/private.module').then(m => m.PrivateModule),
    canActivate: [AuthGuard]
  },
  {
    path: '403',
    component: ErrorPageComponent,
    data: {
      code: 403,
      title: 'Access Denied',
      message: 'You do not have permission to access this page'
    }
  },
  {
    path: '500',
    component: ErrorPageComponent,
    data: {
      code: 500,
      title: 'Server Error',
      message: 'Something went wrong on our side'
    }
  },
  {
    path: '**',
    component: ErrorPageComponent,
    data: {
      code: 404,
      title: 'Page Not Found',
      message: 'The page you are looking for does not exist'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

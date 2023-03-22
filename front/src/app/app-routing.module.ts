import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ErrorComponent } from './error/error.component';
import { AuthGuard } from './Guards/auth.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path:'',redirectTo:'dashboard',pathMatch:'full'
  },
  {
    path:'login',component: LoginComponent
  },
  {
    path:'dashboard',component: DashboardComponent,canActivate:[AuthGuard]
  },
  {
    path:'project',loadChildren: () => import('./project/project.module').then(x=>x.ProjectModule),canActivate:[AuthGuard]
  },
  {
    path:'**',component: ErrorComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

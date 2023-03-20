import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './comman/login/login.component';
import { PortfolioComponent } from './comman/portfolio/portfolio.component';
import { ProjectComponent } from './comman/project/project.component';
import { DashboardComponent} from '../app/admin-component/dashboard/dashboard.component';
import { ProjectModelComponent } from './admin-component/project-model/project-model.component';

const routes: Routes = [
  { path: '', component: PortfolioComponent },
  { path: 'project/:portfolio_id/:project_id', component: ProjectComponent },
  { path:'login',component:LoginComponent},
  { path:'dashboard',component:DashboardComponent},
  { path: 'projectmodel/:portfolio_id/:project_id', component: ProjectModelComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

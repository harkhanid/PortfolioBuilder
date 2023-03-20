import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PortfolioComponent } from './comman/portfolio/portfolio.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './comman/login/login.component';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms'; 
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';


import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';


import { DashboardComponent } from './admin-component/dashboard/dashboard.component';
import { ProjectListComponent } from './admin-component/project-list/project-list.component';
import { ProjectComponent } from './comman/project/project.component';
import { ProjectModelComponent } from './admin-component/project-model/project-model.component';



@NgModule({
  declarations: [
    AppComponent,
    PortfolioComponent,
    ProjectComponent,
    LoginComponent,
    DashboardComponent,
    ProjectListComponent,
    ProjectModelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    FroalaEditorModule.forRoot(), 
    FroalaViewModule.forRoot(),
    
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

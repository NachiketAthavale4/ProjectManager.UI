import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CreateUserComponent } from './add-user/create-user/create-user.component';
import { ViewUserComponent } from './add-user/view-user/view-user.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AddUserComponent,
    AddProjectComponent,
    AddTaskComponent,
    ViewTaskComponent,
    PageNotFoundComponent,
    CreateUserComponent,
    ViewUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      
      { 
        path: 'dashboard', 
        component: DashboardComponent, 
        children: [
          { path: '', redirectTo: 'view-task', pathMatch: 'full' },
          { path: 'add-project', component: AddProjectComponent },
          { path: 'add-task', component: AddTaskComponent },
          { path: 'add-user', component: AddUserComponent },
          { path: 'view-task', component: ViewTaskComponent },
          { path: '**', component: PageNotFoundComponent }
        ] 
      },
      { path: '**', component: PageNotFoundComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

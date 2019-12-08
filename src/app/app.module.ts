import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HttpClientModule } from '@angular/common/http';
import { NotifierModule, NotifierOptions } from 'angular-notifier';

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
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateProjectComponent } from './add-project/create-project/create-project.component';
import { ViewProjectComponent } from './add-project/view-project/view-project.component';
import { UpdateTaskComponent } from './view-task/update-task/update-task.component';
import { TaskViewComponent } from './view-task/task-view/task-view.component';

const customNotifierOptions: NotifierOptions = {
  position: {
		horizontal: {
			position: 'middle',
			distance: 12
		},
		vertical: {
			position: 'top',
			distance: 12,
			gap: 10
		}
	},
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};

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
    ViewUserComponent,
    CreateProjectComponent,
    ViewProjectComponent,
    UpdateTaskComponent,
    TaskViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NotifierModule.withConfig(customNotifierOptions),
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
          { 
            path: 'view-task', 
            component: ViewTaskComponent,
            children: [
              { path: '', redirectTo: 'view', pathMatch: 'full' },
              { path: "update-task", component: UpdateTaskComponent },
              { path: "view", component: TaskViewComponent }
            ]
          },
          { path: '**', component: PageNotFoundComponent }
        ] 
      },
      { path: '**', component: PageNotFoundComponent }
    ]),
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

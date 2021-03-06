import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { FormControl } from '@angular/forms';
import { AppProject } from 'src/app/models/app-project';
import { NotifierService } from 'angular-notifier';
import { User } from 'src/app/models/user';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.css'],
  providers: [ ProjectService ]
})
export class ViewProjectComponent implements OnInit {

  queryField : FormControl = new FormControl();
  private notifier: NotifierService;

  searchText : string;
  searchList : AppProject[];

  userList : User[];

  updateProjectId : number;
  updateProjectName : string;
  updateProjectPriority : number;
  updateProjectStartDate : Date;
  updateProjectEndDate : Date;
  updateProjectManager : User;
  UpdateActive : boolean = false;
  updateProjectIndex : number = null;

  isStartDateAsc: boolean;
  isEndDateAsc: boolean;
  isCompletedAsc: boolean;
  isPriorityAsc: boolean;

  updateActiveIndicator : boolean = false;

  projectList : AppProject[];

  constructor(private projectService : ProjectService, notifier: NotifierService) {
    this.notifier = notifier;
   }

  ngOnInit() {
    this.projectService.getAppProject().subscribe(
      (projects : AppProject[]) => {
        this.projectList = projects;
        this.searchList = this.projectList;
      },
      (errors) => {
        console.log(errors);
        this.showNotification('error','Some problem occurred');
      }
    );
    this.queryField.valueChanges.subscribe(
      (result : string) => {
        if(result != null){
          if(result=="" || result==" "){
            this.projectService.getAppProject().subscribe(
              (projects : AppProject[]) => {
                this.projectList = projects;
                this.searchList = this.projectList;
              },
              (errors) => {
                console.log(errors);
                this.showNotification('error','Some problem occurred');
              }
            );
          }
          else{
            this.searchText = result;
          }
        }
      } 
    );
  }

  public showNotification( type: string, message: string ): void {
		this.notifier.notify( type, message );
  }

  editProject(i : number){
    this.updateProjectId = this.searchList[i].projectId;
    this.updateProjectName = this.searchList[i].projectName;
    this.updateProjectPriority = this.searchList[i].priority;
    this.updateProjectStartDate = this.searchList[i].projectStartDate;
    this.updateProjectEndDate = this.searchList[i].projectEndDate;
    this.updateProjectManager = this.searchList[i].user;
    this.UpdateActive = true;
    this.updateProjectIndex = i;
  }

  suspend(i : number){
    this.projectService.deleteAppProject(this.searchList[i]).subscribe(
      (data) => {
        this.showNotification('success','Project Deleted Successfully!');
        this.projectService.getAppProject().subscribe(
          (projects) => {
            this.projectList = projects
            this.searchList = this.projectList;
            if(this.searchText != null){
              this.searchList = this.searchList.filter(x => x.projectName.toUpperCase()
                .includes(this.searchText.toUpperCase()));
            }
          },
          (error) => {
            console.log(error);
          }
        );
      },
      (error) => {
        console.log(error);
        this.showNotification('error','Some problem occurred');
      }
    );
  }

  searchUser(){
    if(this.searchText != null){
      this.searchList = 
        this.projectList.filter(x => x.projectName.toUpperCase()
          .includes(this.searchText.toUpperCase()));
      }
  }

  sortPriority(){
    this.isPriorityAsc = !this.isPriorityAsc;
      const direction = this.isPriorityAsc ? 1 : -1;
      this.searchList.sort((a, b) => (a.priority > b.priority) ? 1 * direction :
        ((b.priority > a.priority) ? -1 * direction : 0));
  }

  sortStartDate(){
    this.isStartDateAsc = !this.isStartDateAsc;
      const direction = this.isStartDateAsc ? 1 : -1;
      this.searchList.sort((a, b) => (a.projectStartDate > b.projectStartDate) ? 1 * direction
        : ((b.projectStartDate > a.projectStartDate) ? -1 * direction : 0));
  }

  sortEndDate(){
    this.isEndDateAsc = !this.isEndDateAsc;
    const direction = this.isEndDateAsc ? 1 : -1;
    this.searchList.sort((a, b) => (a.projectEndDate > b.projectEndDate) ? 1 * direction :
      ((b.projectEndDate > a.projectEndDate) ? -1 * direction : 0));
  }

  sortCompleted(){
    this.isCompletedAsc = !this.isCompletedAsc;
    const direction = this.isCompletedAsc ? 1 : -1;
    this.searchList.sort((a, b) => (a.noOfCompletedTasks > b.noOfCompletedTasks) ? 1 * direction :
      ((b.noOfCompletedTasks > a.noOfCompletedTasks) ? -1 * direction : 0));
  }

  onNotify(project : Project) : void {
    if(project != null && project.projectName != null){
      if(this.updateProjectIndex != null){
        this.projectList[this.updateProjectIndex].projectId = project.projectId;
        this.projectList[this.updateProjectIndex].projectName = project.projectName;
        this.projectList[this.updateProjectIndex].priority = project.priorty;
        this.projectList[this.updateProjectIndex].projectStartDate = project.startDate;
        this.projectList[this.updateProjectIndex].projectEndDate = project.endDate;
        this.projectList[this.updateProjectIndex].user = project.User;
        this.projectService.getAppProject().subscribe(
          (projects) => {
            this.projectList = projects
            this.searchList = this.projectList;
            if(this.searchText != null){
              this.searchList = this.searchList.filter(x => x.projectName.toUpperCase().includes(this.searchText.toUpperCase()));
            }
          },
          (error) => {
            console.log(error);
          }
        );
      }

      this.projectService.getAppProject().subscribe(
        (projects) => {
          this.projectList = projects
          this.searchList = this.projectList;
          if(this.searchText != null){
            this.searchList = this.searchList.filter(x => x.projectName.toUpperCase().includes(this.searchText.toUpperCase()));
          }
        },
        (error) => {
          console.log(error);
        }
      );

      this.updateProjectId = null;
      this.updateProjectName = null;
      this.updateProjectPriority = null;
      this.updateProjectStartDate = null;
      this.updateProjectEndDate = null;
      this.updateProjectManager = null;
      this.UpdateActive = false;
      this.updateProjectIndex = null;
    }
    else{
      this.updateProjectIndex = null;
      this.UpdateActive = false;
    }
  }

}

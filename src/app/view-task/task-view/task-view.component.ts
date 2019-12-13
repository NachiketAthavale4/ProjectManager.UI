import { Component, OnInit, TemplateRef } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormControl } from '@angular/forms';
import { Task } from 'src/app/models/task';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';
import { TaskService } from 'src/app/services/task-service';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.css'],
  providers: [ ProjectService, TaskService ]
})
export class TaskViewComponent implements OnInit {
  queryField : FormControl = new FormControl();

  private notifier: NotifierService;

  projectName : string = null;
  projectId : number = null;

  taskList : Task[] = [];

  totalTaskList: Task[];

  isStartDateAsc: boolean;
  isEndDateAsc: boolean;
  isPriorityAsc: boolean;
  isCompletedAsc: boolean;

  projectList : Project[];

  searchList : Project[];
  searchText : string;

  modalRef: BsModalRef;

  constructor(private modalService: BsModalService,private projectService: ProjectService,
    notifier: NotifierService,private taskService: TaskService) {
      this.notifier = notifier;
  }

  ngOnInit() {
    this.projectService.getProject().subscribe((project) => {
      this.projectList = project;
      this.searchList = this.projectList;
    },
      (error) => {
        console.log(error);
        this.showNotification('error','Some problem occurred while fetching records');
      });
    
    this.queryField.valueChanges.subscribe(
      (result : string) => {
        if(result != null){
          if(result=="" || result==" "){
            this.projectService.getProject().subscribe((project) => {
              this.projectList = project;
              this.searchList = this.projectList;
            },
              (error) => {
                console.log(error);
                this.showNotification('error','Some problem occurred while fetching records');
              });
          }
          else{
            this.searchText = result;
          }
        }
      } 
    );
  }

  searchProject(){
    if(this.searchText != null){
      this.searchList = 
        this.searchList.filter(x => x.projectName.toUpperCase().includes(this.searchText.toUpperCase()));
      }
  }

  public showNotification( type: string, message: string ): void {
		this.notifier.notify( type, message );
  }

  
 
  openModal(template: TemplateRef<any>) {
    this.searchText = null;
    this.queryField.setValue(null);
    this.projectService.getProject().subscribe((project) => {
      this.projectList = project;
      this.searchList = this.projectList;
    },
      (error) => {
        console.log(error);
        this.showNotification('error','Some problem occurred while fetching records');
      });
    this.modalRef = this.modalService.show(template);
  }

  selectProject(i : number){
    this.projectName = this.searchList[i].projectName;
    this.projectId = this.searchList[i].projectId;
    this.taskService.getAllTasksByProjectId(this.projectId).subscribe((tasks) => {
      this.totalTaskList = tasks;
      this.taskList = this.totalTaskList;
      console.log('Task Length',this.totalTaskList[0].task_Name);
    },
    (error) => {
      console.log(error);
      this.showNotification('error','Some problem occurred.')
    });
  }

  endTask(i : number){
    this.taskList[i].status = 1;
    this.taskService.updateTask(this.taskList[i]).subscribe((data)=> {
      this.showNotification('success','Task Completed Successfully');
      this.taskService.getAllTasksByProjectId(this.projectId).subscribe((tasks)=> {
        this.taskList = tasks;
      },
      (error)=> {
        console.log(error);
        this.showNotification('error','Some Error Occurred');
      })
    },
    (error)=> {
      console.log(error);
      this.showNotification('error','Some error occurred');
    });
  }

  sortByStartDate(){
    this.isStartDateAsc = !this.isStartDateAsc;
    const direction = this.isStartDateAsc ? 1 : -1;
    this.taskList.sort((a, b) => (a.start_Date > b.start_Date) ? 1 * direction
      : ((b.start_Date > a.start_Date) ? -1 * direction : 0));
  }

  sortByEndDate(){
    this.isEndDateAsc = !this.isEndDateAsc;
    const direction = this.isEndDateAsc ? 1 : -1;
    this.taskList.sort((a, b) => (a.end_Date > b.end_Date) ? 1 * direction :
      ((b.end_Date > a.end_Date) ? -1 * direction : 0));
  }

  sortByPriority(){
    this.isPriorityAsc = !this.isPriorityAsc;
    const direction = this.isPriorityAsc ? 1 : -1;
    this.taskList.sort((a, b) => (a.priority > b.priority) ? 1 * direction :
      ((b.priority > a.priority) ? -1 * direction : 0));
  }

  sortByStatus(){
    this.isCompletedAsc = !this.isCompletedAsc;
    const direction = this.isCompletedAsc ? 1 : -1;
    this.taskList.sort((a, b) => (a.status> b.status) ? 1 * direction :
      ((b.status > a.status) ? -1 * direction : 0));
  }

}

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
          console.log("Result: ",result);
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

  searchList : Project[];
  searchText : string;

  searchProject(){
    if(this.searchText != null){
      this.searchList = 
        this.searchList.filter(x => x.projectName.toUpperCase().includes(this.searchText.toUpperCase()));
      }
  }

  public showNotification( type: string, message: string ): void {
		this.notifier.notify( type, message );
  }

  projectName : string = null;
  projectId : number = null;

  taskList : Task[] = [];

  totalTaskList: Task[];

  projectList : Project[];

  modalRef: BsModalRef;
 
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
    console.log(i);
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
    this.taskList = this.taskList.sort((a,b) => 
      <any>new Date(a.start_Date) - <any>new Date(b.start_Date));
  }

  sortByEndDate(){
    this.taskList = this.taskList.sort((a,b) => 
      <any>new Date(a.end_Date) - <any>new Date(b.end_Date));
  }

  sortByPriority(){
    this.taskList = this.taskList.sort((x,y) => x.priority - y.priority);
  }

  sortByStatus(){
    this.taskList = this.taskList.sort((x,y) => x.status - y.status);
  }

}

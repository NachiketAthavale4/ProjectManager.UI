import { Component, OnInit, TemplateRef } from '@angular/core';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormControl } from '@angular/forms';
import { Task } from 'src/app/models/task';
import { Project } from 'src/app/models/project';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.css']
})
export class TaskViewComponent implements OnInit {
  queryField : FormControl = new FormControl();

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
    this.searchList = this.projectList;
    this.queryField.valueChanges.subscribe(
      (result : string) => {
        if(result != null){
          console.log("Result: ",result);
          if(result=="" || result==" "){
            this.searchList = this.projectList;
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
        this.projectList.filter(x => x.projectName.toUpperCase().includes(this.searchText.toUpperCase()));
      }
  }

  projectName : string = null;
  projectId : number = null;

  taskList : Task[] = [];

  totalTaskList: Task[] = [
    {
      startDate : new Date(Date.now()),
      endDate : new Date(Date.now()),
      taskName : 'SearchWorkItems',
      priority : 11,
      status : 'In Progress',
      taskId : 2,
      parentTaskId : 1,
      parentTaskName : 'WorkItems',
      projectId : 1
    },
    {
      startDate : new Date(Date.now()),
      endDate : new Date(Date.now()),
      taskName : 'SaveWorkItems',
      priority : 11,
      status : 'In Progress',
      taskId : 3,
      parentTaskId : 1,
      parentTaskName : 'WorkItems',
      projectId : 1
    },
    {
      startDate : new Date(Date.now()),
      endDate : new Date(Date.now()),
      taskName : 'ListWorkItems',
      priority : 11,
      status : 'In Progress',
      taskId : 4,
      parentTaskId : null,
      parentTaskName : null,
      projectId : 1
    }
  ];

  projectList : Project[] = [
    {
      projectId : 1,
      status : "In Progress",
      managedBy : "Anakin Skywalker",
      numOfTasks : 4,
      priorty : 10,
      projectName: "WorkItem",
      startDate : new Date(Date.now()),
      endDate : new Date(Date.now())
    },
    {
      projectId : 2,
      status : "Completed",
      managedBy : "Darth Vader",
      numOfTasks : 2,
      priorty : 15,
      projectName: "WorkOrders",
      startDate : new Date(Date.now()),
      endDate : new Date(Date.now())
    }
  ];

  modalRef: BsModalRef;
 
  openModal(template: TemplateRef<any>) {
    this.searchText = null;
    this.queryField.setValue(null);
    this.searchList = this.projectList;
    this.modalRef = this.modalService.show(template);
  }

  selectProject(i : number){
    this.projectName = this.searchList[i].projectName;
    this.projectId = this.searchList[i].projectId;
    this.taskList = this.totalTaskList.filter(x => x.projectId == this.projectId);
    console.log(this.taskList.length);
  }

  endTask(i : number){
    console.log(i);
    this.taskList[i].status = "Completed";
  }

  sortByStartDate(){
    this.taskList = this.taskList.sort((a,b) => a.startDate.getDate() - b.startDate.getDate());
  }
}

import { Component, OnInit, TemplateRef, Input } from '@angular/core';
import { ParentTask } from 'src/app/models/parent-task';
import { Project } from 'src/app/models/project';
import { User } from 'src/app/models/user';
import { FormControl, NgForm } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ActivatedRoute } from '@angular/router';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit {

  queryField : FormControl = new FormControl();
  queryProjectField : FormControl = new FormControl();
  queryTaskField : FormControl = new FormControl();

  constructor(private modalService: BsModalService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.updateTaskId = +this.route.snapshot.queryParamMap.get("taskId");
    let projectId = this.baseTaskList.filter(x => x.TaskId == this.updateTaskId)[0].Project_ID;
    this.projectName = this.projectList.filter(x => x.projectId == projectId)[0].projectName;
    
    let routeParentTaskId =
     this.baseTaskList.filter(x => x.TaskId == this.updateTaskId)[0].Parent_ID;
    this.parentTaskName =
     this.taskList.filter(x => x.parentTaskId == routeParentTaskId)[0].parentTaskName;

    this.taskStartDate = new Date(Date.now());
    this.taskEndDate = new Date();
    this.taskEndDate.setDate(this.taskStartDate.getDate() + 1);
    this.searchUserList = this.userList;
    this.searchProjectList = this.projectList;
    this.searchTaskList = this.taskList;
    this.queryField.valueChanges.subscribe(
      (result : string) => {
        if(result != null){
          console.log("Result: ",result);
          if(result=="" || result==" "){
            this.searchUserList = this.userList;
          }
          else{
            this.searchUserText = result;
          }
        }
      } 
    );
    this.queryProjectField.valueChanges.subscribe(
      (result : string) => {
        if(result != null){
          console.log("Result: ",result);
          if(result=="" || result==" "){
            this.searchProjectList = this.projectList;
          }
          else{
            this.searchProjectText = result;
          }
        }
      } 
    );
    this.queryTaskField.valueChanges.subscribe(
      (result : string) => {
        if(result != null){
          console.log("Result: ",result);
          if(result=="" || result==" "){
            this.searchTaskList = this.taskList;
          }
          else{
            this.searchTaskText = result;
          }
        }
      } 
    );
  }

  updateTaskId : number;

  searchUser(){
    if(this.searchUserText != null){
      this.searchUserList = 
        this.userList.filter(x => x.firstName.toUpperCase().includes(this.searchUserText.toUpperCase())
                                  || x.lastName.toUpperCase().includes(this.searchUserText.toUpperCase()));
      }
  }

  addUser(i : number){
    this.taskUser = this.searchUserList[i].firstName + " " + this.searchUserList[i].lastName;
  }

  searchTask(){
    if(this.searchTaskText != null){
      this.searchTaskList = this.searchTaskList.filter(
        x => x.parentTaskName.toUpperCase().includes(this.searchTaskText.toUpperCase()));
    }
  }

  onSubmit(form : NgForm){
    console.log("Form Submitted");
    if(this.taskEndDate < this.taskStartDate){
      this.endDateValid = false;
      console.log(this.endDateValid);
    }
    else {
      this.endDateValid = true;
      console.log(this.endDateValid);
      this.taskUpdateSuccess = true;
    }
  }

  taskUpdateSuccess : boolean;

  modalRef: BsModalRef;

  parentTaskName : string;
  searchUserText : string;
  searchUserList : User[];
  taskUser : string;
  @Input() projectName : string;

  endDateValid : boolean;

  userList : User[] = [
    {
      employeeId : 666298,
      firstName : "Nachiket",
      lastName : "Athavale",
      taskId : null,
      projectId : null,
      userId : null
    },
    {
      employeeId : 666299,
      firstName : "Obi-Wan",
      lastName : "Kenobi",
      taskId : null,
      projectId : null,
      userId : null
    },
    {
      employeeId : 666300,
      firstName : "Sheev",
      lastName : "Palpatine",
      taskId : null,
      projectId : null,
      userId : null
    },
    {
      employeeId : 666301,
      firstName : "Anakin",
      lastName : "Skywalker",
      taskId : null,
      projectId : null,
      userId : null
    },
    {
      employeeId : 666302,
      firstName : "Master",
      lastName : "Windu",
      taskId : null,
      projectId : null,
      userId : null
    },
    {
      employeeId : 666303,
      firstName : "Qui-Gon",
      lastName : "Jin",
      taskId : null,
      projectId : null,
      userId : null
    }
  ];

  openModal(template: TemplateRef<any>) {
    this.searchUserText = null;
    this.queryField.setValue(null);
    this.searchUserList = this.userList;
    this.modalRef = this.modalService.show(template);
  }

  openProjectModal(template: TemplateRef<any>){
    this.searchProjectText = null;
    this.queryProjectField.setValue(null);
    this.searchProjectList = this.projectList;
    this.modalRef = this.modalService.show(template);
  }

  openTemplateModal(template: TemplateRef<any>){
    this.searchTaskList = this.taskList;
    this.searchTaskText = null;
    this.queryTaskField.setValue(null);
    this.modalRef = this.modalService.show(template);
  }

  selectProject(i: number){
    this.projectName = this.searchProjectList[i].projectName;
  }

  searchProject(){
    if(this.searchProjectText != null){
      this.searchProjectList = 
        this.projectList.filter(x => x.projectName.toUpperCase().includes(
          this.searchProjectText.toUpperCase()));
      }
  }

  selectTask(i : number){
    console.log(i);
    this.parentTaskName = this.searchTaskList[i].parentTaskName;
  }

  taskName : string;
  taskStartDate : Date;
  taskEndDate : Date;
  isTaskParent: boolean = false;
  searchProjectText : string;
  searchProjectList : Project[];

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

  searchTaskText : string;
  searchTaskList : ParentTask[];
  taskList : ParentTask[] = [
    {
      parentTaskId : 1,
      parentTaskName : "Execute Order 66"
    },
    {
      parentTaskId : 2,
      parentTaskName : "Execute Order 67"
    },
    {
      parentTaskId : 2,
      parentTaskName : "Execute Order 68"
    }
  ];

  baseTaskList : Task[] = [
    {
      Start_Date : new Date(Date.now()),
      End_Date : new Date(Date.now()),
      Task_Name : 'SearchWorkItems',
      Priority : 11,
      Status : 'In Progress',
      TaskId : 2,
      Parent_ID : 1,
      ParentTaskName : 'WorkItems',
      Project_ID : 1,
      User : null
    },
    {
      Start_Date : new Date(Date.now()),
      End_Date : new Date(Date.now()),
      Task_Name : 'SaveWorkItems',
      Priority : 11,
      Status : 'In Progress',
      TaskId : 3,
      Parent_ID : 1,
      ParentTaskName : 'WorkItems',
      Project_ID : 1,
      User : null
    },
    {
      Start_Date : new Date(Date.now()),
      End_Date : new Date(Date.now()),
      Task_Name : 'ListWorkItems',
      Priority : 11,
      Status : 'In Progress',
      TaskId : 4,
      Parent_ID : null,
      ParentTaskName : null,
      Project_ID : 1,
      User : null
    }
  ];

}

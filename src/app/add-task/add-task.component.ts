import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { User } from '../models/user';
import { FormControl } from '@angular/forms';
import { Project } from '../models/project';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  queryField : FormControl = new FormControl();
  queryProjectField : FormControl = new FormControl();

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
    this.searchUserList = this.userList;
    this.searchProjectList = this.projectList;
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
  }

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

  modalRef: BsModalRef;

  
  searchUserText : string;
  searchUserList : User[];
  taskUser : string;
  projectName : string;

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

  

}

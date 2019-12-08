import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { User } from '../models/user';
import { FormControl, NgForm } from '@angular/forms';
import { Project } from '../models/project';
import { ParentTask } from '../models/parent-task';
import { NotifierService } from 'angular-notifier';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
  providers: [ UserService ]
})
export class AddTaskComponent implements OnInit {

  queryField : FormControl = new FormControl();
  queryProjectField : FormControl = new FormControl();
  queryTaskField : FormControl = new FormControl();

  private notifier: NotifierService;

  constructor(private modalService: BsModalService,private userService: UserService, 
    notifier: NotifierService) { 
      this.notifier = notifier;
    }

  ngOnInit() {
    this.taskStartDate = new Date(Date.now());
    this.taskEndDate = new Date();
    this.taskEndDate.setDate(this.taskStartDate.getDate() + 1);

    this.userService.getUser().subscribe((users) => {
      this.userList = users;
      this.searchUserList = this.userList;
      },
      (error) => {
        console.log(error);
        this.showNotification('error','Some problem occurred while fetching records');
      }
    );

    this.searchProjectList = this.projectList;
    this.searchTaskList = this.taskList;
    this.queryField.valueChanges.subscribe(
      (result : string) => {
        if(result != null){
          console.log("Result: ",result);
          if(result=="" || result==" "){
            this.userService.getUser().subscribe((users) => {
              this.userList = users;
              this.searchUserList = this.userList;
              },
              (error) => {
                console.log(error);
                this.showNotification('error','Some problem occurred while fetching records');
              }
            );
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

  searchUser(){
    if(this.searchUserText != null){
      let combinedSearchText = this.searchUserText.split(" ");
      let combinedSearchString = combinedSearchText.join("");
      console.log(combinedSearchString);
      this.searchUserList = 
        this.userList.filter(x => x.firstName.toUpperCase().includes(this.searchUserText.toUpperCase())
                                  || x.lastName.toUpperCase().includes(this.searchUserText.toUpperCase())
                                  || (x.firstName.toUpperCase() + x.lastName.toUpperCase()).includes(combinedSearchString.toUpperCase()));
      }
  }

  public showNotification( type: string, message: string ): void {
		this.notifier.notify( type, message );
  }

  addUser(i : number){
    this.taskUser = this.searchUserList[i].firstName + " " + this.searchUserList[i].lastName;
    this.selectedUser = this.searchUserList[i];
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
    }
  }

  modalRef: BsModalRef;

  parentTaskName : string;
  searchUserText : string;
  searchUserList : User[];
  taskUser : string;
  selectedUser : User;
  projectName : string;

  endDateValid : boolean;

  userList : User[];

  openModal(template: TemplateRef<any>) {
    this.searchUserText = null;
    this.queryField.setValue(null);
    this.userService.getUser().subscribe((users) => {
      this.userList = users;
      this.searchUserList = this.userList;
      },
      (error) => {
        console.log(error);
        this.showNotification('error','Some problem occurred while fetching records');
      }
    );
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

}

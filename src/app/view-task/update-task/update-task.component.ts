import { Component, OnInit, TemplateRef, Input } from '@angular/core';
import { ParentTask } from 'src/app/models/parent-task';
import { NotifierService } from 'angular-notifier';
import { Project } from 'src/app/models/project';
import { User } from 'src/app/models/user';
import { FormControl, NgForm } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ActivatedRoute } from '@angular/router';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task-service';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { setTime } from 'ngx-bootstrap/chronos/utils/date-setters';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css'],
  providers: [ TaskService, ProjectService, UserService ]
})
export class UpdateTaskComponent implements OnInit {

  queryField : FormControl = new FormControl();
  queryProjectField : FormControl = new FormControl();
  queryTaskField : FormControl = new FormControl();

  private notifier: NotifierService;

  constructor(private modalService: BsModalService, private route: ActivatedRoute,
    notifier: NotifierService,private taskService: TaskService,private projectService: ProjectService,
    private userService : UserService, private router: Router) {
      this.notifier = notifier;
  }

  ngOnInit() {
    this.updateprojectId = +this.route.snapshot.queryParamMap.get("projectId");
    this.updateTaskId = +this.route.snapshot.queryParamMap.get("taskId");

    this.taskService.getAllTasksByProjectId(this.updateprojectId).subscribe((tasks) => {
      this.baseTaskList = tasks;
      console.log("Length",this.baseTaskList.filter(x => x.taskId == this.updateTaskId)[0].parent_ID);
      this.routeParentTaskId =
        this.baseTaskList.filter(x => x.taskId == this.updateTaskId)[0].parent_ID;
        this.taskStartDate = 
          new Date(this.baseTaskList.filter(x => x.taskId == this.updateTaskId)[0].start_Date);

        this.taskEndDate = 
          new Date(this.baseTaskList.filter(x => x.taskId == this.updateTaskId)[0].end_Date);

        this.taskPriority = this.baseTaskList.filter(x => x.taskId == this.updateTaskId)[0].priority;

        this.taskName = this.baseTaskList.filter(x => x.taskId == this.updateTaskId)[0].task_Name;

        this.updateUser = this.baseTaskList.filter(x => x.taskId == this.updateTaskId)[0].user;

        this.updateTaskStatus = this.baseTaskList.filter(x => x.taskId == this.updateTaskId)[0].status;

        this.userService.getUser().subscribe((users)=>{
          this.userList = users;
          this.searchUserList = this.userList;
        },
        (error)=>{
          console.log(error);
          this.showNotification('error','Some problem occurred while fetching records');
        });

        this.taskService.getParentTask().subscribe((data) => {
          console.log("Parent Task Success");
          this.taskList = data;
          this.searchTaskList = this.taskList;
          this.parentTaskName = 
            this.taskList.filter(x => x.parentTaskId == this.routeParentTaskId)[0].parentTaskName;
        },
        (error) => {
          console.log(error);
          this.showNotification('error','Some problem occurred while fetching records');
        });
      this.projectService.getProject().subscribe((project) => {
        this.projectList = project;
        this.projectName = 
          this.projectList.filter(x => x.projectId == this.updateprojectId)[0].projectName
      },
        (error) => {
          console.log(error);
          this.showNotification('error','Some problem occurred while fetching records');
      });
    },
    (error) => {
      console.log(error);
      this.showNotification('error','Some problem occurred.')
    });
    
    this.queryField.valueChanges.subscribe(
      (result : string) => {
        if(result != null){
          console.log("Result: ",result);
          if(result=="" || result==" "){
            this.userService.getUser().subscribe((users)=>{
              this.userList = users;
              this.searchUserList = this.userList;
            },
            (error)=>{
              console.log(error);
              this.showNotification('error','Some problem occurred while fetching records');
            });
          }
          else{
            this.searchUserText = result;
          }
        }
      } 
    );
    
    this.queryTaskField.valueChanges.subscribe(
      (result : string) => {
        if(result != null){
          console.log("Result: ",result);
          if(result=="" || result==" "){
            this.taskService.getParentTask().subscribe((data) => {
              this.taskList = data;
              this.searchTaskList = this.taskList;
            },
            (error) => {
              console.log(error);
              this.showNotification('error','Some problem occurred while fetching records');
            });
          }
          else{
            this.searchTaskText = result;
          }
        }
      } 
    );
  }

  updateprojectId : number;
  updateTaskId : number;
  routeParentTaskId : number;
  taskPriority : number;
  updateUser : User;
  updateTaskStatus : number;

  selectedTask : ParentTask;

  public showNotification( type: string, message: string ): void {
		this.notifier.notify( type, message );
  }

  searchUser(){
    if(this.searchUserText != null){
      let searchTextCombined = this.searchUserText.split(' ');
      this.searchUserList = 
        this.userList.filter(x => x.firstName.toUpperCase().includes(this.searchUserText.toUpperCase())
                                  || x.lastName.toUpperCase().includes(this.searchUserText.toUpperCase())
                                  || (x.firstName.toUpperCase()+x.lastName.toUpperCase()).includes(searchTextCombined.join("").toUpperCase()));
      }
  }

  clearParentTask(){
    this.parentTaskName = null;
    this.selectedTask = null;
  }

  addUser(i : number){
    this.taskUser = this.searchUserList[i].firstName + " " + this.searchUserList[i].lastName;
    this.updateUser = this.searchUserList[i];
  }

  searchTask(){
    if(this.searchTaskText != null){
      this.searchTaskList = this.searchTaskList.filter(
        x => x.parentTaskName.toUpperCase().includes(this.searchTaskText.toUpperCase()));
    }
  }

  onSubmit(form : NgForm){
    console.log("Form Submitted");
    if(form.valid){
      if(this.taskEndDate < this.taskStartDate){
        this.endDateValid = false;
      }
      else {
        this.endDateValid = true;
        this.updateTask = {
          end_Date : this.taskEndDate,
          start_Date : this.taskStartDate,
          priority : this.taskPriority,
          taskId : this.updateTaskId,
          task_Name : this.taskName,
          user : this.updateUser,
          status : this.updateTaskStatus,
          parent_ID : this.routeParentTaskId,
          parentTaskName : this.parentTaskName,
          project_ID : this.updateprojectId
        };

        this.taskService.updateTask(this.updateTask).subscribe((data) => {
          this.showNotification('success','Task Updated Successfully');
          form.onReset();
          this.routeBack();
        },
        (error) => {
          this.showNotification('error','Some Error Occurred');
          console.log(error);
        })
      }
    }
    
  }

  routeBack(){
    setTimeout(() => {
      this.router.navigate(['/dashboard','view-task','view']);
    },3000);
  }

  taskUpdateSuccess : boolean;

  modalRef: BsModalRef;
  selectedUser : User;
  updateTask : Task;

  parentTaskName : string;
  searchUserText : string;
  searchUserList : User[];
  taskUser : string;
  @Input() projectName : string;

  endDateValid : boolean;

  userList : User[];

  openModal(template: TemplateRef<any>) {
    this.searchUserText = null;
    this.queryField.setValue(null);
    this.userService.getUser().subscribe((users)=>{
      this.userList = users;
      this.searchUserList = this.userList;
    },
    (error)=>{
      console.log(error);
      this.showNotification('error','Some problem occurred while fetching records');
    });
    this.modalRef = this.modalService.show(template);
  }

  openTemplateModal(template: TemplateRef<any>){
    this.taskService.getParentTask().subscribe((data) => {
      this.taskList = data;
      this.searchTaskList = this.taskList;
    },
    (error) => {
      console.log(error);
      this.showNotification('error','Some problem occurred while fetching records');
    });
    this.searchTaskText = null;
    this.queryTaskField.setValue(null);
    this.modalRef = this.modalService.show(template);
  }

  selectTask(i : number){
    console.log(i);
    this.parentTaskName = this.searchTaskList[i].parentTaskName;
    this.selectedTask = this.searchTaskList[i];
  }

  taskName : string;
  taskStartDate : Date;
  taskEndDate : Date;
  isTaskParent: boolean = false;
  searchProjectText : string;
  searchProjectList : Project[];

  projectList : Project[];

  searchTaskText : string;
  searchTaskList : ParentTask[];
  taskList : ParentTask[];

  baseTaskList : Task[];

}

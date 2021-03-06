import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { User } from '../models/user';
import { FormControl, NgForm } from '@angular/forms';
import { Project } from '../models/project';
import { ParentTask } from '../models/parent-task';
import { NotifierService } from 'angular-notifier';
import { UserService } from '../services/user.service';
import { ProjectService } from '../services/project.service';
import { TaskService } from '../services/task-service';
import { Task } from '../models/task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
  providers: [ UserService, ProjectService, TaskService ]
})
export class AddTaskComponent implements OnInit {

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

  queryField : FormControl = new FormControl();
  queryProjectField : FormControl = new FormControl();
  queryTaskField : FormControl = new FormControl();

  private notifier: NotifierService;

  modalRef: BsModalRef;

  parentTaskName : string;
  selectedTask : ParentTask;
  selectedTaskIndex : number;
  searchUserText : string;
  searchUserList : User[];
  taskUser : string;
  selectedUser : User;
  projectName : string;
  selectedProject : Project;
  selectedProjectIndex : number;

  addTask : Task = {
    parent_ID : null,
    end_Date : null,
    parentTaskName : null,
    priority : null,
    project_ID : null,
    start_Date : null,
    status : null,
    taskId : null,
    task_Name : null,
    user : null
  };

  endDateValid : boolean;
  taskPriority : number;
  userList : User[];

  constructor(private modalService: BsModalService,private userService: UserService, 
    notifier: NotifierService, private projectService: ProjectService,
    private taskService: TaskService) { 
      this.notifier = notifier;
    }

  ngOnInit() {
    this.taskStartDate = new Date(Date.now());
    this.taskEndDate = new Date();
    this.taskEndDate.setDate(this.taskStartDate.getDate() + 1);
    this.taskPriority = 0;

    this.userService.getUser().subscribe((users) => {
      this.userList = users;
      this.searchUserList = this.userList;
      },
      (error) => {
        console.log(error);
        this.showNotification('error','Some problem occurred while fetching records');
      }
    );

    this.projectService.getProject().subscribe((project) => {
      this.projectList = project;
      this.searchProjectList = this.projectList;
    },
      (error) => {
        console.log(error);
        this.showNotification('error','Some problem occurred while fetching records');
      });

    this.taskService.getParentTask().subscribe((tasks) => {
      this.taskList = tasks;
      this.searchTaskList = this.taskList;
    },
    (error) => {
      console.log(error);
      this.showNotification('error','Some problem occurred while fetching records');
    })

    this.queryField.valueChanges.subscribe(
      (result : string) => {
        if(result != null){
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
          if(result=="" || result==" "){
            this.projectService.getProject().subscribe((project) => {
              this.projectList = project;
              this.searchProjectList = this.projectList;
            },
              (error) => {
                console.log(error);
                this.showNotification('error','Some problem occurred while fetching records');
              });
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
          if(result=="" || result==" "){
            this.taskService.getParentTask().subscribe((tasks) => {
              this.taskList = tasks;
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
    if(form.valid && ((this.isTaskParent && this.taskUser == null) || 
        (!this.isTaskParent && this.taskUser != null))){
      if(this.taskEndDate < this.taskStartDate){
        this.endDateValid = false;
      }
      else {
        this.endDateValid = true;
        this.addTask.end_Date = this.taskEndDate;
        this.addTask.start_Date = this.taskStartDate;
        this.addTask.task_Name = this.taskName;
        if(this.selectedProject != null){
          this.addTask.project_ID = this.selectedProject.projectId;
        }
        if(this.selectedTask != null){
          this.addTask.parent_ID = this.selectedTask.parentTaskId;
          this.addTask.parentTaskName = this.selectedTask.parentTaskName;
        }
        this.addTask.priority = this.taskPriority;
        this.addTask.user = this.selectedUser;
        this.taskService.addTask(this.addTask).subscribe((data) => {
          this.showNotification('success','Task inserted successfully');
          this.resetFields();
          form.onReset();
        },
          (error) => {
            console.log(error);
            this.showNotification('error','Some error occurred while inserting');
          });
      }
    }
  }

  resetFields(){
    this.selectedUser = null;
    this.taskUser = null;
    this.selectedProject = null;
    this.projectName = null;
    this.parentTaskName = null;
    this.selectedTask = null;
  }

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
    this.projectService.getProject().subscribe((project) => {
      this.projectList = project;
      this.searchProjectList = this.projectList;
    },
      (error) => {
        console.log(error);
        this.showNotification('error','Some problem occurred while fetching records');
      });
    this.modalRef = this.modalService.show(template);
  }

  openTemplateModal(template: TemplateRef<any>){
    this.taskService.getParentTask().subscribe((tasks) => {
      this.taskList = tasks;
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

  selectProject(i: number){
    this.projectName = this.searchProjectList[i].projectName;
    this.selectedProject = this.searchProjectList[i];
    this.selectedProjectIndex = this.searchProjectList[i].projectId;
  }

  searchProject(){
    if(this.searchProjectText != null){
      this.searchProjectList = 
        this.projectList.filter(x => x.projectName.toUpperCase().includes(
          this.searchProjectText.toUpperCase()));
      }
  }

  selectTask(i : number){
    this.parentTaskName = this.searchTaskList[i].parentTaskName;
    this.selectedTask = this.searchTaskList[i];
    this.selectedTaskIndex = this.searchTaskList[i].parentTaskId;
  }

}

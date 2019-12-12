import { Component, OnInit, TemplateRef, Input, OnChanges, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { User } from 'src/app/models/user';
import { FormControl } from '@angular/forms';
import { Project } from 'src/app/models/project';
import { NotifierService } from 'angular-notifier';
import { UserService } from 'src/app/services/user.service';
import { ProjectService } from 'src/app/services/project.service';
import { AppProject } from 'src/app/models/app-project';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css'],
  providers: [ UserService, ProjectService ]
})
export class CreateProjectComponent implements OnInit, OnChanges{

  ngOnChanges(): void {
    console.log("Priority: ",this.editPriorty);
    this.projectData.projectId = this.ediProjectId;
    console.log("Project Id Create ",this.ediProjectId);
    this.projectData.projectName = this.editProjectName;
    this.projectData.projectStartDate = new Date(this.editStartDate);
    this.projectData.projectEndDate = new Date(this.editEndDate);
    this.projectData.priority = this.editPriorty;
    this.projectData.user = this.editManagedBy;
    if(this.editManagedBy != null){
      this.managerName = this.projectData.user.firstName + " " + this.projectData.user.lastName;
    }

    this.updateIndicator = this.UpdateActive;
    console.log("ngOnChanges",this.UpdateActive);
    console.log(this.editEndDate);
  }

  managerName : string;

  @Input() UpdateActive : boolean = false;

  @Input() ediProjectId : number;
  @Input() editProjectName : string = null;
  @Input() editStartDate : Date = null;
  @Input() editEndDate : Date = null;
  @Input() editStatus : number = null;
  @Input() editPriorty : number = 0;
  @Input() editManagedBy : User = null;
  @Input() editNumOfTasks : number = null;

  @Output() notify : EventEmitter<AppProject> = new EventEmitter<AppProject>();

  updateIndicator : boolean = false;

  private notifier: NotifierService;

  resetFields(){
    this.updateIndicator = false;
    this.notify.emit(this.projectData);
  }

  public showNotification( type: string, message: string ): void {
		this.notifier.notify( type, message );
  }

  projectData : AppProject = {
    projectEndDate : null,
    noOfTasks : null,
    priority : null,
    projectId : null,
    projectName : null,
    projectStartDate : null,
    noOfCompletedTasks : null,
    user : null
  }
  
  queryField : FormControl = new FormControl();
  constructor(private modalService: BsModalService, notifier: NotifierService,
    private userService : UserService, private projectService : ProjectService) { 
      this.notifier = notifier;
    }

  ngOnInit() {
    this.projectData.priority = 0;
    this.userService.getUser().subscribe((users) => {
      this.userList = users;
      this.searchList = this.userList;
    },
    (error) => {
      console.log(error);
      this.showNotification('error','Some Problem Occurrred');
    });
    
    this.queryField.valueChanges.subscribe(
      (result : string) => {
        if(result != null){
          console.log("Result: ",result);
          if(result=="" || result==" "){
            this.userService.getUser().subscribe((users) => {
              this.userList = users;
              this.searchList = this.userList;
            },
            (error) => {
              console.log(error);
              this.showNotification('error','Some Problem Occurrred');
            });
          }
          else{
            this.searchText = result;
          }
        }
      } 
    );
  }

  projectDateEnabled : boolean = false;

  dateValid : boolean = false;

  searchText : string;

  searchList : User[];

  selectedUser : User;

  userList : User[];

  toggleProjectDateEnabled(){
    this.projectDateEnabled = !this.projectDateEnabled;
    this.projectData.projectStartDate = new Date(Date.now());
    this.projectData.projectEndDate = new Date();
    this.projectData.projectEndDate.setDate(this.projectData.projectEndDate.getDate() + 1);
  }

  dateValidCheck(){
    if(this.projectDateEnabled && this.projectData.projectStartDate < this.projectData.projectEndDate){
      console.log(true);
      return true;
    }
    else{
      console.log(false);
      return false;
    }
  }

  modalRef: BsModalRef;
 
  openModal(template: TemplateRef<any>) {
    this.searchText = null;
    this.queryField.setValue(null);
    this.userService.getUser().subscribe((users) => {
      this.userList = users;
      this.searchList = this.userList;
    },
    (error) => {
      console.log(error);
      this.showNotification('error','Some Problem Occurrred');
    });
    this.modalRef = this.modalService.show(template);
  }

  onSubmit(form: NgForm){
    
    if(form.valid){
      this.dateValid = this.dateValidCheck();

      if(this.updateIndicator){
        console.log("Form Submitted");
        console.log(this.projectData.projectName);
        console.log(this.projectData.projectStartDate);
        console.log(this.projectData.projectEndDate);

        this.ediProjectId = this.projectData.projectId;
        this.editEndDate = this.projectData.projectEndDate;
        this.editStartDate = this.projectData.projectStartDate;
        this.editNumOfTasks = this.projectData.noOfTasks;
        this.editPriorty = this.projectData.priority;
        this.editProjectName = this.projectData.projectName;
        this.editManagedBy = this.projectData.user;
        

        this.projectService.updateAppProject(this.projectData).subscribe(
          (data) => {
            this.showNotification('success',"Project Updated Successfully");
            form.onReset();
            this.projectData.projectId = this.ediProjectId;
            this.projectData.projectName = this.editProjectName;
            this.projectData.projectStartDate = this.editStartDate;
            this.projectData.projectEndDate = this.editEndDate;
            this.projectData.user = this.editManagedBy;
            this.projectData.priority = this.editPriorty;
            this.projectData.noOfTasks = this.editNumOfTasks;
            this.notify.emit(this.projectData);
          },
          (error) => {
            console.log(error);
            this.showNotification('error','Some problem occurred while updating');
          }
        );

        
        this.updateIndicator = false;
        this.projectData.projectId = null;
        this.projectData.projectName = null;
        this.projectData.projectStartDate = null;
        this.projectData.projectEndDate = null;
        this.projectData.noOfCompletedTasks = null;
        this.projectData.priority = null;
        this.projectData.user = null;
        this.projectData.noOfTasks = null;
        this.projectDateEnabled = false;
    
        console.log("Create-Project UpdateActive",this.updateIndicator);
      }
      else{
        console.log("Form posted");
        this.projectData.user = this.selectedUser;
        let projectName = this.projectData.projectName;
        let projectId = this.projectData.projectId;
        this.projectService.addAppProject(this.projectData).subscribe((data) => {
          this.projectData.user.projectId = this.projectData.projectId;
          console.log("Project Id ",this.projectData.user.projectId);
          this.userService.updateUser(this.projectData.user).subscribe(
            (data) => {
              this.showNotification('success','Project Added Successfully');
              form.onReset();
              this.projectData = {
                projectId : projectId,
                projectName : projectName,
                noOfCompletedTasks : null,
                noOfTasks : null,
                priority : null,
                projectEndDate : null,
                projectStartDate : null,
                user : null
              }
              this.notify.emit(this.projectData);

              this.projectDateEnabled = false;
            },
            (error) => {
              console.log(error);
              this.showNotification("error","Error Occurred while Updating User!");
            }
          );
        },
        (error) => {
          console.log(error);
          this.showNotification('error','Some Problem Occurred')
        });
      }
    }

  }

  addManager(i : number){
    console.log(this.searchList[i].employeeId);
    this.selectedUser = this.searchList[i];
    this.projectData.user = this.selectedUser;
    this.managerName = this.selectedUser.firstName + " " + this.selectedUser.lastName;
  }

  searchUser(){
    if(this.searchText != null){
      let searchCombinedText = this.searchText.split(' ');
      this.searchList = 
        this.userList.filter(x => x.firstName.toUpperCase().includes(this.searchText.toUpperCase())
                                  || x.lastName.toUpperCase().includes(this.searchText.toUpperCase())
                                  || (x.firstName.toUpperCase()+x.lastName.toUpperCase()).includes(
                                        searchCombinedText.join("").toUpperCase()));
      }
  }

}

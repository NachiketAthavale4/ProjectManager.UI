import { Component, OnInit, TemplateRef, Input, OnChanges, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { User } from 'src/app/models/user';
import { FormControl } from '@angular/forms';
import { Project } from 'src/app/models/project';
import { NotifierService } from 'angular-notifier';
import { UserService } from 'src/app/services/user.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css'],
  providers: [ UserService, ProjectService ]
})
export class CreateProjectComponent implements OnInit, OnChanges{

  ngOnChanges(): void {
    
    this.projectData.projectName = this.editProjectName;
    this.projectData.startDate = this.editStartDate;
    this.projectData.endDate = this.editEndDate;
    this.projectData.priorty = this.editPriorty;
    this.projectData.managedBy = this.editManagedBy;

    this.updateIndicator = this.onUpdateActive;
    console.log("ngOnChanges",this.onUpdateActive);
    console.log(this.editEndDate);
  }

  @Input() onUpdateActive : boolean = false;

  @Input() ediProjectId : number;
  @Input() editProjectName = null;
  @Input() editStartDate = null;
  @Input() editEndDate = null;
  @Input() editStatus = null;
  @Input() editPriorty = 0;
  @Input() editManagedBy = null;
  @Input() editNumOfTasks = null;

  @Output() notify : EventEmitter<Project> = new EventEmitter<Project>();

  updateIndicator : boolean = false;

  private notifier: NotifierService;

  resetFields(){
    this.updateIndicator = false;
    this.notify.emit(this.projectData);
  }

  public showNotification( type: string, message: string ): void {
		this.notifier.notify( type, message );
  }

  projectData : Project = {
    endDate : null,
    managedBy : null,
    numOfTasks : null,
    priorty : null,
    projectId : null,
    projectName : null,
    startDate : null,
    status : null,
    User : null
  }

  queryField : FormControl = new FormControl();
  constructor(private modalService: BsModalService, notifier: NotifierService,
    private userService : UserService, private projectService : ProjectService) { }

  ngOnInit() {
    this.projectData.priorty = 0;
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
    this.projectData.startDate = new Date(Date.now());
    this.projectData.endDate = new Date();
    this.projectData.endDate.setDate(this.projectData.startDate.getDate() + 1);
  }

  dateValidCheck(){
    if(this.projectDateEnabled && this.projectData.startDate < this.projectData.endDate){
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

  updateProject(){
    console.log("Form Submitted");
    console.log(this.projectData.projectName);
    console.log(this.projectData.startDate);
    console.log(this.projectData.endDate);
    this.notify.emit(this.projectData);
    this.updateIndicator = false;
    this.projectData.projectId = null;
    this.projectData.projectName = null;
    this.projectData.startDate = null;
    this.projectData.endDate = null;
    this.projectData.status = null;
    this.projectData.priorty = null;
    this.projectData.managedBy = null;
    this.projectData.numOfTasks = null;

    console.log("Create-Project OnUpdate",this.updateIndicator);
  }

  onSubmit(form: NgForm){
    
    if(form.valid){
      this.dateValid = this.dateValidCheck();

      if(this.updateIndicator){
      
      }
      else{
        this.projectData.User = this.selectedUser;
        this.projectService.addProject(this.projectData).subscribe((data) => {
          this.showNotification('success','Project Added Successfully');
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
    this.editManagedBy = this.selectedUser.firstName + " " + this.selectedUser.lastName;
    this.projectData.managedBy = this.editManagedBy;
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

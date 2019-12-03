import { Component, OnInit, TemplateRef, Input, OnChanges, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { User } from 'src/app/models/user';
import { FormControl } from '@angular/forms';
import { Project } from 'src/app/models/project';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
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

  resetFields(){
    this.updateIndicator = false;
    this.notify.emit(this.projectData);
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
  }

  queryField : FormControl = new FormControl();
  constructor(private modalService: BsModalService) { }

  ngOnInit() {
    this.editPriorty = 0;
    this.searchList = this.userList;
    this.queryField.valueChanges.subscribe(
      (result : string) => {
        if(result != null){
          console.log("Result: ",result);
          if(result=="" || result==" "){
            this.searchList = this.userList;
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

  toggleProjectDateEnabled(){
    this.projectDateEnabled = !this.projectDateEnabled;
    this.projectData.startDate = new Date(Date.now());
    this.projectData.endDate = new Date();
    this.projectData.endDate.setDate(this.projectData.startDate.getDate() + 1);
  }

  dateValidCheck(){
    console.log("DateValid fired");
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
    this.searchList = this.userList;
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
    this.dateValid = this.dateValidCheck();

    if(this.updateIndicator){
      
    }
    else{
      console.log("Form Submitted");
      console.log(this.projectData.projectName);
      console.log(this.projectData.status);
      console.log(this.projectData.projectId);
    }

  }

  addManager(i : number){
    this.editManagedBy = this.userList[i].firstName + " " + this.userList[i].lastName;
  }

  searchUser(){
    if(this.searchText != null){
      this.searchList = 
        this.userList.filter(x => x.firstName.toUpperCase().includes(this.searchText.toUpperCase())
                                  || x.lastName.toUpperCase().includes(this.searchText.toUpperCase())
                                  || (this.searchText.includes(" ") && x.firstName.toUpperCase().includes(this.searchText.toUpperCase())
                                      && x.lastName.toUpperCase().includes(this.searchText.toUpperCase())));
      }
  }

}

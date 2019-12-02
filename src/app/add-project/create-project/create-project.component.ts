import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { User } from 'src/app/models/user';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {

  queryField : FormControl = new FormControl();
  constructor(private modalService: BsModalService) { }

  ngOnInit() {
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
  startDateOnEnabled : Date;
  endDateOnEnabled : Date; 

  projectName : string;
  startDate : Date;
  endDate : Date;
  priorty : number;
  status : boolean;
  managedBy : string;

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
    this.startDateOnEnabled = new Date(Date.now());
    this.endDateOnEnabled = new Date();
    this.endDateOnEnabled.setDate(this.startDateOnEnabled.getDate() + 1);
  }

  dateValidCheck(){
    console.log("DateValid fired");
    if(this.projectDateEnabled && this.startDateOnEnabled < this.endDateOnEnabled){
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

  onSubmit(form: NgForm){
    this.dateValid = this.dateValidCheck();
  }

  addManager(i : number){
    this.managedBy = this.userList[i].firstName + " " + this.userList[i].lastName;
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

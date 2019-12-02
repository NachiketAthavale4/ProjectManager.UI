import { Component, OnInit, Input, OnChanges, ChangeDetectorRef, ApplicationRef, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/models/user';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit, OnChanges {
  
  ngOnChanges(): void {
    this.user.employeeId = this.editEmployeeId;
    this.user.firstName = this.editFirstName;
    this.user.lastName = this.editLastName;
    this.updateIndicator = this.onUpdateActive;
    console.log("ngOnChanges",this.onUpdateActive);
  }

  constructor() { }

  ngOnInit() {
  }

  @Input() onUpdateActive : boolean = false;
  @Input() editEmployeeId : number = 654;
  @Input() editFirstName : string;
  @Input() editLastName : string;
  @Output() notify : EventEmitter<User> = new EventEmitter<User>();
  
  user : User = {
    employeeId : null,
    firstName : null,
    lastName : null,
    projectId : null,
    taskId : null,
    userId : null
  }

  updateIndicator : boolean = false;

  resetFields(){
    this.user.employeeId = null;
    this.user.firstName = null;
    this.user.lastName = null;
    this.updateIndicator = false;
    this.notify.emit(this.user);
  }

  addUser(form : NgForm){
    console.log("Form Submitted");
    console.log(this.user.employeeId);
    console.log(this.user.firstName);
    console.log(this.user.lastName);
  }

  onUpdateClicked(form : NgForm){
    console.log("Form Submitted");
    console.log(this.user.employeeId);
    console.log(this.user.firstName);
    console.log(this.user.lastName);
    this.notify.emit(this.user);
    this.updateIndicator = false;
    this.user.firstName = null;
    this.user.lastName = null;
    this.user.employeeId = null;
    console.log("Create-User OnUpdate",this.updateIndicator);
  }

}

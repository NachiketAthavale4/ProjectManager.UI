import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  user : User = {
    employeeId : null,
    firstName : null,
    lastName : null,
    projectId : null,
    taskId : null,
    userId : null
  }

  resetFields(){
    this.user = null;
  }

  addUser(form : NgForm){
    console.log("Form Submitted");
    console.log(this.user.employeeId);
    console.log(this.user.firstName);
    console.log(this.user.lastName);
  }

}

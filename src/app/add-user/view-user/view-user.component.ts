import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.searchList = this.userList;
  }

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

  editEmployeeId : number;
  editUserFirstName : string;
  editUserLastName : string;
  onUpdateActive : boolean = false;
  searchText : string = null;

  editUserIndex : number = null;

  editUser(i : number){
    console.log(this.userList[i].employeeId);
    this.editEmployeeId = this.userList[i].employeeId;
    this.editUserFirstName = this.userList[i].firstName;
    this.editUserLastName = this.userList[i].lastName;
    this.onUpdateActive = true;
    this.editUserIndex = i;
    console.log("Edit-User OnUpdate",this.onUpdateActive);
  }

  deleteUser(i : number){
    console.log(this.userList[i].employeeId);
    this.searchList.splice(i,1);
  }

  searchUser(){
    console.log(this.searchText);
    this.searchList = 
      this.userList.filter(x => x.firstName.toUpperCase() == this.searchText.toUpperCase()
                                || x.lastName.toUpperCase() == this.searchText.toUpperCase());
  }

  onNotify(user : User) : void {
    if(user != null && user.employeeId != null){
      console.log("Notify Ran");
      if(this.editUserIndex != null){
        this.userList[this.editUserIndex].employeeId = user.employeeId;
        this.userList[this.editUserIndex].firstName = user.firstName;
        this.userList[this.editUserIndex].lastName = user.lastName;
      }
      this.editEmployeeId = null;
      this.editUserFirstName = null;
      this.editUserLastName = null;
      this.onUpdateActive = false;
      this.editUserIndex = null;
    }
    else{
      this.editUserIndex = null;
    }
  }

}

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
    }
  ];

  editEmployeeId : number;
  editUserFirstName : string;
  editUserLastName : string;
  onUpdateActive : boolean = false;
  searchText : string = null;

  editUser(i : number){
    console.log(this.userList[i].employeeId);
    this.editEmployeeId = this.userList[i].employeeId;
    this.editUserFirstName = this.userList[i].firstName;
    this.editUserLastName = this.userList[i].lastName;
    this.onUpdateActive = true;
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

  onNotify(successVal : boolean) : void {
    if(successVal){
      console.log("Notify Ran");
      this.editEmployeeId = null;
      this.editUserFirstName = null;
      this.editUserLastName = null;
      this.onUpdateActive = false;
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css'],
  providers: [ UserService ]
})
export class ViewUserComponent implements OnInit {

  constructor(private userService: UserService) { }

  // Update User Properties.

  editUserIndex : number = null;
  editEmployeeId : number;
  editUserFirstName : string;
  editUserLastName : string;
  onUpdateActive : boolean = false;

  // Form Control to search Users.
  queryField : FormControl = new FormControl();

  // Text to be searched inputted by the User.
  searchText : string = null;

  // List of users that have been searched. By default set to all users.
  searchList : User[];

  // List which will contain all the Users from database.
  userList : User[];

  // Initialization Lifecycle hook.
  ngOnInit() {
    this.userService.getUser().subscribe((users) => {
      console.log('Success');
      this.userList = users;
      this.searchList = this.userList;
    },
      (error) => {
        console.log(error)
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
                console.log(error)
              });
          }
          else{
            this.searchText = result;
          }
        }
      } 
    );
  }

  // Search users based on text inputted by user.
  searchUser(){
    this.userService.getUser().subscribe((users) => {
      this.userList = users;
      this.searchList = this.userList;
      if(this.searchText != null){
        this.searchList = 
          this.userList.filter(x => x.firstName.toUpperCase().includes(this.searchText.toUpperCase())
                                || x.lastName.toUpperCase().includes(this.searchText.toUpperCase()));
        }
    },
      (error) => {
        console.log(error)
      });
    console.log(this.searchText);
    
  }

  // Updates a user's details
  editUser(i : number){
    console.log(this.userList[i].employeeId);
    this.editEmployeeId = this.userList[i].employeeId;
    this.editUserFirstName = this.userList[i].firstName;
    this.editUserLastName = this.userList[i].lastName;
    this.onUpdateActive = true;
    this.editUserIndex = i;
    console.log("Edit-User OnUpdate",this.onUpdateActive);
  }

  // Delete a user from Project Manager system.
  deleteUser(i : number){
    console.log(this.userList[i].employeeId);
    this.searchList.splice(i,1);
  }

  // Method ran from Nested Component Create User, when that user is updated.
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

  // Sort Methods to sort users.
  sortByFirstName(){
    this.searchList = this.searchList.sort((x,y) => x.firstName.localeCompare(y.firstName));
  }

  sortByLastName(){
    this.searchList = this.searchList.sort((x,y) => x.lastName.localeCompare(y.lastName));
  }

  sortByEmployeeId(){
    
  }

  

}

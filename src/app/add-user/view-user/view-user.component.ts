import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { FormControl } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css'],
  providers: [ UserService ]
})
export class ViewUserComponent implements OnInit {

  private notifier: NotifierService;

  constructor(private userService: UserService, notifier: NotifierService) {
    this.notifier = notifier;
  }

  // Update User Properties.

  editUserIndex : number = null;
  editEmployeeId : number;
  editUserFirstName : string;
  editUserLastName : string;
  editUserTaskId : number;
  editUserProjectId : number;
  editUserId : number;
  UpdateActive : boolean = false;

  // Form Control to search Users.
  queryField : FormControl = new FormControl();

  // Text to be searched inputted by the User.
  searchText : string = null;

  // List of users that have been searched. By default set to all users.
  searchList : User[];

  // List which will contain all the Users from database.
  userList : User[];

  sortOrderEmployeeId : boolean = false;
  sortOrderFirstName : boolean = false;
  sortOrderLastName : boolean = false;

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
                                || x.lastName.toUpperCase().includes(this.searchText.toUpperCase())
                                || (x.firstName.toUpperCase() + " " + x.lastName.toUpperCase())
                                .includes(this.searchText.toUpperCase()));
        }
    },
      (error) => {
        console.log(error)
      });
    console.log(this.searchText);
    
  }

  public showNotification( type: string, message: string ): void {
		this.notifier.notify( type, message );
  }

  // Updates a user's details
  editUser(i : number){
    console.log(this.userList[i].employeeId);
    this.editEmployeeId = this.userList[i].employeeId;
    this.editUserFirstName = this.userList[i].firstName;
    this.editUserLastName = this.userList[i].lastName;
    this.editUserTaskId = this.userList[i].taskId;
    this.editUserProjectId = this.userList[i].projectId;
    this.editUserId = this.userList[i].userId;
    console.log(this.editUserId);
    this.UpdateActive = true;
    this.editUserIndex = i;
  }

  // Delete a user from Project Manager system.
  deleteUser(i : number){
    console.log(this.userList[i].employeeId);
    this.userService.deleteUser(this.searchList[i]).subscribe((data) => {
      this.userService.getUser().subscribe((users) => {
        this.userList = users;
        this.searchList = this.userList;
        if(this.sortOrderEmployeeId){
          this.sortByEmployeeId();
        }
        else if(this.sortOrderFirstName){
          this.sortByFirstName();
        }
        else if(this.sortOrderLastName){
          this.sortByLastName();
        }
      },
        (error) => {
          console.log(error)
        });
      this.showNotification('success','User Deleted Successfully');
    },
      (error) => {
        console.log(error);
        this.showNotification('error','Some problem occurred while deleting');
      });
  }

  // Method ran from Nested Component Create User, when that user is updated.
  onNotify(user : User) : void {
    console.log("Notify First Ran");
    console.log(user);
    if(user != null && user.employeeId != null){
      console.log("Notify Ran");
      
      this.userService.getUser().subscribe((users) => {
        this.userList = users;
        this.searchList = this.userList;
        if(this.sortOrderEmployeeId){
          this.sortByEmployeeId();
        }
        else if(this.sortOrderFirstName){
          this.sortByFirstName();
        }
        else if(this.sortOrderLastName){
          this.sortByLastName();
        }
      },
        (error) => {
          console.log(error)
        });

      if(this.editUserIndex != null){
        this.userList[this.editUserIndex].employeeId = user.employeeId;
        this.userList[this.editUserIndex].firstName = user.firstName;
        this.userList[this.editUserIndex].lastName = user.lastName;
      }
      this.editEmployeeId = null;
      this.editUserFirstName = null;
      this.editUserLastName = null;
      this.UpdateActive = false;
      this.editUserIndex = null;
    }
    else{
      this.editUserIndex = null;
    }
  }

  // Sort Methods to sort users.
  sortByFirstName(){
    this.sortOrderFirstName = !this.sortOrderFirstName;
    const direction = this.sortOrderFirstName ? 1 : -1;
    this.searchList.sort((a, b) => (a.firstName > b.firstName) ? 1 * direction
      : ((b.firstName > a.firstName) ? -1 * direction : 0));
  }

  sortByLastName(){
    this.sortOrderLastName = !this.sortOrderLastName;
    const direction = this.sortOrderLastName ? 1 : -1;
    this.searchList.sort((a, b) => (a.lastName > b.lastName) ? 1 * direction :
      ((b.lastName > a.lastName) ? -1 * direction : 0));
  }

  sortByEmployeeId(){
    this.sortOrderEmployeeId = !this.sortOrderEmployeeId;
    const direction = this.sortOrderEmployeeId ? 1 : -1;
    this.searchList.sort((a, b) => (a.employeeId > b.employeeId) ? 1 * direction :
      ((b.employeeId > a.employeeId) ? -1 * direction : 0));
  }

}

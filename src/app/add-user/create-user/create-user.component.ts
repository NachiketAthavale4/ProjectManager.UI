import { Component, OnInit, Input, OnChanges, ChangeDetectorRef, ApplicationRef, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/models/user';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
  providers: [ UserService ]
})
export class CreateUserComponent implements OnInit, OnChanges {
  
  // Nested Component Properties, invoked when Update User.
  @Input() onUpdateActive : boolean = false;
  @Input() editEmployeeId : number;
  @Input() editFirstName : string;
  @Input() editLastName : string;
  @Input() editUserId : number;
  @Input() editProjectId : number;
  @Input() editTaskId : number;
  @Output() notify : EventEmitter<User> = new EventEmitter<User>();

  // Boolean property to indicate whether user is to be updated or a new one.
  updateIndicator : boolean = false;

  user : User = {
    employeeId : null,
    firstName : null,
    lastName : null,
    projectId : null,
    taskId : null,
    userId : null
  }

  updatedUser : User = {
    employeeId : null,
    firstName : null,
    lastName : null,
    projectId : null,
    taskId : null,
    userId : null
  };

  private notifier: NotifierService;

  constructor(private userService: UserService, notifier: NotifierService) {
    this.notifier = notifier;
   }

  ngOnInit() {
    
  }

  // On Changes Lifecycle hook which is invoked when user properties change in Outer Component View.
  ngOnChanges(): void {
    this.user.employeeId = this.editEmployeeId;
    this.user.firstName = this.editFirstName;
    this.user.lastName = this.editLastName;
    this.user.projectId = this.editProjectId;
    this.user.taskId = this.editTaskId;
    this.user.userId = this.editUserId;
    this.updateIndicator = this.onUpdateActive;

    if(this.user.employeeId != null){
      this.user.employeeId = +this.user.employeeId.toString().trim();
    }

    console.log("ngOnChanges",this.onUpdateActive);
  }

  public showNotification( type: string, message: string ): void {
		this.notifier.notify( type, message );
  }

  // Reset all the input form controls for User Form
  resetFields(){
    this.user.employeeId = null;
    this.user.firstName = null;
    this.user.lastName = null;
    this.updateIndicator = false;
    this.notify.emit(this.user);
  }

  // NgSubmit method to add a user to the User Table.
  addUser(form : NgForm){
    if(form.valid){
      this.updatedUser = this.user;
      console.log("Before Update: ",this.user.employeeId);
      if(this.updateIndicator){
          this.userService.updateUser(this.updatedUser).subscribe((data) => {
            this.showNotification('success','User Updated Successfully');
            console.log("Emit: ",this.user.employeeId);
            this.notify.emit(this.user);
          },
          (error) => {
            this.showNotification('error','Some problem occurred while Updating');
            console.log(error);
          }
        );
        
        this.updateIndicator = false;
        this.user.firstName = null;
        this.user.lastName = null;
        this.user.employeeId = null;
      }
      else{
        this.userService.addUser(this.user).subscribe((data) => {
          this.showNotification('success','User Added Successfully');
          this.notify.emit(this.user);
        },
          (error) => {
            this.showNotification('error','Some problem occurred while Insertion');
            console.log(error);
          });
      }

      form.resetForm();
    }
  }

}

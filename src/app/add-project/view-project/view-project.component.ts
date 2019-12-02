import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { NgForm } from '@angular/forms';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.css']
})
export class ViewProjectComponent implements OnInit {

  queryField : FormControl = new FormControl();
  constructor() { }

  ngOnInit() {
    this.searchList = this.projectList;
    this.queryField.valueChanges.subscribe(
      (result : string) => {
        if(result != null){
          console.log("Result: ",result);
          if(result=="" || result==" "){
            this.searchList = this.projectList;
          }
          else{
            this.searchText = result;
          }
        }
      } 
    );
  }

  searchText : string;
  searchList : Project[];

  updateProjectName : string;
  updateProjectPriority : number;
  updateProjectStartDate : Date;
  updateProjectEndDate : Date;
  updateProjectManager : string;
  onUpdateActive : boolean = false;
  updateProjectIndex : number = null;

  editProject(i : number){
    console.log(this.searchList[i].projectName);
    this.updateProjectName = this.searchList[i].projectName;
    this.updateProjectPriority = this.searchList[i].priorty;
    this.updateProjectStartDate = this.searchList[i].startDate;
    this.updateProjectEndDate = this.searchList[i].endDate;
    this.updateProjectManager = this.searchList[i].managedBy;
    this.onUpdateActive = true;
    this.updateProjectIndex = i;
    console.log("Edit-Project OnUpdate",this.onUpdateActive);
  }

  projectList : Project[] = [
    {
      startDate : new Date(Date.now()),
      endDate : new Date(Date.now()),
      priorty : 11,
      numOfTasks : 4,
      projectId : 1,
      projectName : 'WorkItems',
      status : "In Progress",
      managedBy : "Anakin Skywalker"
    },
    {
      startDate : new Date(Date.now()),
      endDate : new Date(Date.now()),
      priorty : 8,
      numOfTasks : 3,
      projectId : 2,
      projectName : 'WorkOrders',
      status : "Completed",
      managedBy : "Darth Vader"
    }
  ];

  suspend(i : number){
    this.projectList[i].status = "Suspended"
  }

  searchUser(){
    if(this.searchText != null){
      this.searchList = 
        this.projectList.filter(x => x.projectName.toUpperCase().includes(this.searchText.toUpperCase()));
      }
  }

  updateActiveIndicator : boolean = false;

}

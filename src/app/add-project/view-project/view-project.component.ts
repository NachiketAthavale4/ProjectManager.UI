import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';

@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.css']
})
export class ViewProjectComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  projectList : Project[] = [
    {
      startDate : new Date(Date.now()),
      endDate : new Date(Date.now()),
      priorty : 11,
      numOfTasks : 4,
      projectId : 1,
      projectName : 'WorkItems',
      status : false
    },
    {
      startDate : new Date(Date.now()),
      endDate : new Date(Date.now()),
      priorty : 8,
      numOfTasks : 3,
      projectId : 2,
      projectName : 'WorkOrders',
      status : true
    }
  ];

}

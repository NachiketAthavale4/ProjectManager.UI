import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  taskList: Task[] = [
    {
      startDate : new Date(Date.now()),
      endDate : new Date(Date.now()),
      taskName : 'SearchWorkItems',
      priority : 11,
      status : 'In Progress',
      taskId : 2,
      parentTaskId : 1,
      parentTaskName : 'WorkItems',
      projectId : null
    },
    {
      startDate : new Date(Date.now()),
      endDate : new Date(Date.now()),
      taskName : 'SaveWorkItems',
      priority : 11,
      status : 'In Progress',
      taskId : 3,
      parentTaskId : 1,
      parentTaskName : 'WorkItems',
      projectId : null
    },
    {
      startDate : new Date(Date.now()),
      endDate : new Date(Date.now()),
      taskName : 'ListWorkItems',
      priority : 11,
      status : 'In Progress',
      taskId : 4,
      parentTaskId : null,
      parentTaskName : null,
      projectId : null
    }
  ];

}

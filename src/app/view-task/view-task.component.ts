import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {

  queryField : FormControl = new FormControl();

  constructor() { }

  ngOnInit() {
    
  }

}

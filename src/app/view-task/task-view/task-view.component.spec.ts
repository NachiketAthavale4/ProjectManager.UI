import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskViewComponent } from './task-view.component';
import { RouterLinkDirectiveStub } from '../../testing/router-link-directive-stub';
import {RouterTestingModule} from '@angular/router/testing';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';

describe('TaskViewComponent', () => {
  let component: TaskViewComponent;
  let fixture: ComponentFixture<TaskViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskViewComponent, RouterLinkDirectiveStub ],
      imports: [ FormsModule, RouterTestingModule, NotifierModule, ReactiveFormsModule, 
        HttpClientModule, ModalModule.forRoot() ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

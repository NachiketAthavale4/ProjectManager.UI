import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateTaskComponent } from './update-task.component';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { RouterLinkDirectiveStub } from '../../testing/router-link-directive-stub';
import {RouterTestingModule} from '@angular/router/testing';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';

describe('UpdateTaskComponent', () => {
  let component: UpdateTaskComponent;
  let fixture: ComponentFixture<UpdateTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateTaskComponent, RouterLinkDirectiveStub ],
      imports: [ FormsModule, BsDatepickerModule.forRoot(), RouterTestingModule, NotifierModule,
        ReactiveFormsModule, HttpClientModule,  ModalModule.forRoot() ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

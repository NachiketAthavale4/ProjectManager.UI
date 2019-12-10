import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddProjectComponent } from './add-project.component';
import { ViewProjectComponent } from './view-project/view-project.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NotifierModule, NotifierOptions } from 'angular-notifier';

describe('AddProjectComponent', () => {
  let component: AddProjectComponent;
  let fixture: ComponentFixture<AddProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProjectComponent, ViewProjectComponent, CreateProjectComponent ],
      imports: [ FormsModule, ReactiveFormsModule, BsDatepickerModule.forRoot(), HttpClientModule,
        ModalModule.forRoot(), NotifierModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

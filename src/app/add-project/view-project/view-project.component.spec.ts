import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewProjectComponent } from './view-project.component';
import { CreateProjectComponent } from '../create-project/create-project.component';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NotifierModule, NotifierOptions } from 'angular-notifier';

describe('ViewProjectComponent', () => {
  let component: ViewProjectComponent;
  let fixture: ComponentFixture<ViewProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewProjectComponent, CreateProjectComponent ],
      imports: [ FormsModule, ReactiveFormsModule, BsDatepickerModule.forRoot(), HttpClientModule,
        ModalModule.forRoot(), NotifierModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

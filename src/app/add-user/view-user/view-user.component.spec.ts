import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewUserComponent } from './view-user.component';
import { CreateUserComponent } from '../create-user/create-user.component';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { HttpClientModule } from '@angular/common/http';

describe('ViewUserComponent', () => {
  let component: ViewUserComponent;
  let fixture: ComponentFixture<ViewUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewUserComponent, CreateUserComponent ],
      imports: [ ReactiveFormsModule, FormsModule, NotifierModule, HttpClientModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

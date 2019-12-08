import { User } from './user';

export interface Task {
    TaskId : number;
    Parent_ID : number;
    ParentTaskName : string;
    Project_ID : number;
    Task_Name : string;
    Start_Date : Date;
    End_Date : Date;
    Priority: number;
    Status : string;
    User : User;
}
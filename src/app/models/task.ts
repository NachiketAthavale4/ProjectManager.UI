import { User } from './user';

export interface Task {
    taskId : number;
    parent_ID : number;
    parentTaskName : string;
    project_ID : number;
    task_Name : string;
    start_Date : Date;
    end_Date : Date;
    priority: number;
    status : number;
    user : User;
}
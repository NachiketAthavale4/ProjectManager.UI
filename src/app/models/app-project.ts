import { User } from './user';

export interface AppProject { 
    projectId : number;
    projectName : string;
    projectStartDate : Date;
    projectEndDate : Date;
    priority : number;
    noOfTasks : number;
    noOfCompletedTasks : number;
    user : User;
}
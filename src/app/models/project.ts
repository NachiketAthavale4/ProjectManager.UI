import { User } from './user';

export interface Project {
    projectId : number;
    projectName : string;
    startDate : Date;
    endDate : Date;
    priorty : number;
    status : string;
    numOfTasks : number;
    managedBy : string
}
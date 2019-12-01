export interface Task {
    taskId : number;
    parentTaskId : number;
    parentTaskName : string;
    projectId : number;
    taskName : string;
    startDate : Date;
    endDate : Date;
    priority: number;
    status : string;
}
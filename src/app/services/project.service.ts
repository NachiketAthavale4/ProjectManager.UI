import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/project';
import { map, catchError } from 'rxjs/operators';
import { BaseService } from './base.service';
import { AppProject } from '../models/app-project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  getProject(): Observable<Project[]> {
    return this.http.get(super.baseurl() + 'api/project')
        .pipe(map((res: Response) => {
            const data = res["data"];
            return data;
        }))
        .pipe(catchError(this.handleError));
  }

  getAppProject(): Observable<AppProject[]> {
    return this.http.get(super.baseurl() + 'api/project')
        .pipe(map((res: Response) => {
            const data = res["data"];
            return data;
        }))
        .pipe(catchError(this.handleError));
  }

addProject(project:Project): Observable<any> {
    return this.http.post(super.baseurl() + 'api/project/add',project)
        .pipe(map((res: Response) => {
            const data = res["data"];
            return data;
        }))
        .pipe(catchError(this.handleError));
}

addAppProject(project:AppProject): Observable<any> {
    return this.http.post(super.baseurl() + 'api/project/add',project)
        .pipe(map((res: Response) => {
            const data = res["data"];
            return data;
        }))
        .pipe(catchError(this.handleError));
}

updateProject(project:Project): Observable<any> {
    return this.http.post(super.baseurl() + 'api/project/update',project)
        .pipe(map((res: Response) => {
            const data = res["data"];
            return data;
        }))
        .pipe(catchError(this.handleError));
}

updateAppProject(project:AppProject): Observable<any> {
    return this.http.post(super.baseurl() + 'api/project/update',project)
        .pipe(map((res: Response) => {
            const data = res["data"];
            return data;
        }))
        .pipe(catchError(this.handleError));
}

deleteProject(project:Project): Observable<any> {
    return this.http.post(super.baseurl() + 'api/project/delete',project)
        .pipe(map((res: Response) => {
            const data = res["data"];
            return data;
        }))
        .pipe(catchError(this.handleError));
}

    deleteAppProject(project : AppProject): Observable<any> {
        return this.http.post(super.baseurl() + 'api/project/delete',project)
            .pipe(map((res : Response) => {
                const data = res["data"];
                return data;
            }))
            .pipe(catchError(this.handleError));
    }

}

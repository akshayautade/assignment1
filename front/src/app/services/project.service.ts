import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { httpClient } from './http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {


  private _projectCount = environment.backend+"project/count";
  private _closureDelayCount = environment.backend+"project/closureDelayCount";
  private _deptWiseCount = environment.backend+"project/deptWiseCount";
  private _projectList = environment.backend+"project";
  private _project = environment.backend+"project/";
  private _updateProject = environment.backend+"project/";
  private _deleteProjectUrl = environment.backend+'project/';
  constructor(private http: HttpClient) { }

  getProject(params:any):Observable<any>{
    return this.http.get(this._projectList,{params:params})
  }
  getProjectCount():Observable<any>{
    return this.http.get(this._projectCount,)
  }
  deptWiseCount():Observable<any>{
    return this.http.get(this._deptWiseCount,)
  }
  closureDelayCount():Observable<any>{
    return this.http.get(this._closureDelayCount,)
  }

  getSingleProject(id:string):Observable<any>{
    return this.http.get(this._project+id);
  }

  createProject(obj:any): Observable<any>{
    return this.http.post(this._project, obj)
  }

  updateProject(id:String,obj:any): Observable<any>{
    return this.http.put(this._updateProject+id, obj)
  }

  deleteProject(id:string){
    return this.http.delete(this._deleteProjectUrl+id)
  }
}

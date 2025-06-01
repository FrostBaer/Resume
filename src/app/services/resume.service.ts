import { Injectable} from '@angular/core';
import { Observable, of } from 'rxjs';
import { Resume } from '../models/resume.type';
import { HttpClient } from '@angular/common/http';
import { Update } from '../models/updates.type';
import mockUpdates  from '../models/mockUpdates.json';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {

  private readonly url: string = "https://resume-func-app.azurewebsites.net/api/"
  
  constructor(private readonly http: HttpClient) { }

  public getResume() : Observable<Resume> {
    let activeUrl = this.url + "GetResume";
    let resume = this.http.get<Resume>(activeUrl);
    return resume;
  }
  public getUpdates() : Observable<Update[]> {  
    return of(mockUpdates.updates);
  }
}
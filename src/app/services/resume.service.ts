import { Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { Resume } from '../models/resume.type';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {

  private url: string = "https://resume-func-app.azurewebsites.net/api/"
  
  constructor(private http: HttpClient) { }

  public getResume() : Observable<Resume> {
    let activeUrl = this.url + "GetResume";
    let resume = this.http.get<Resume>(activeUrl);
    return resume;
  }
}
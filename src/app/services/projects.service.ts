import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Dict, Project, ProjectResult } from '../models/project.type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private readonly url: string =
    'https://resume-func-app.azurewebsites.net/api/';
  private projects: Project[] = [];

  constructor(private http: HttpClient) {}

  public getProjects(): Observable<ProjectResult> {
    let activeUrl = this.url + 'GetProjects';
    let proj = this.http.get<ProjectResult>(activeUrl);
    proj.subscribe((projectList) => {
      this.projects = projectList.projects;
    });
    return proj;
  }
  public getProjectById(id: number): Observable<Project> {
    let activeUrl = this.url + 'GetProjectById/' + id;
    let proj = this.http.get<Project>(activeUrl);
    return proj;
  }
  public getFilteredProjects(filter?: Dict): Project[] {
    let filteredProjects: Project[] = [];
    if (this.projects.length == 0) {
      this.getProjects();
    }
    for (let key in filter) {
      if (filter[key]) {
        this.projects.forEach((proj) => {
          proj.tech.forEach((tech) => {
            if (tech.toLowerCase().includes(key.toLowerCase())) {
              if (!filteredProjects.includes(proj)) {
                filteredProjects.push(proj);
              }
            }
          });
        });
      }
    }
    return filteredProjects;
  }
}

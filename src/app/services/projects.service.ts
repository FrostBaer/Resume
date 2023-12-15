import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project, ProjectResult } from '../models/project.type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  private url: string = "https://resume-func-app.azurewebsites.net/api/"

  constructor(private http: HttpClient) { }

  public getProjects(): Observable<ProjectResult> {
    let activeUrl = this.url + "GetProjects";
    let proj = this.http.get<ProjectResult>(activeUrl);
    return proj;
  }
  public getProjectById(id: number): Observable<Project> {
    let activeUrl = this.url + "GetProjectById/" + id;
    let proj = this.http.get<Project>(activeUrl);
    return proj;
  }
  public getFilteredProjects(filter?: string[], year?: string): Project[] {
    let filteredProjects: Project[] = [];
    if (year != "year" && year != "ALL") {
      this.getProjects().subscribe(
        projectList => {
          projectList.projects.forEach(proj => {
            if (proj.date == year) {
              proj.tech.forEach(tech => {
                if (filter.some((element) => tech.toLowerCase().includes(element.toLowerCase()))) {
                  if (!filteredProjects.includes(proj)) {
                    filteredProjects.push(proj);
                  }
                }
              });
            }
          });
        }
      )
    } else {
      this.getProjects().subscribe(projectList => {
        projectList.projects.forEach( proj => {
          proj.tech.forEach(tech => {
            if (filter.some((element) => tech.toLowerCase().includes(element.toLowerCase()))) {
              if (!filteredProjects.includes(proj)) {
                filteredProjects.push(proj);
              }
            }
          });
        });
      });
    }
    return filteredProjects;
  }
}

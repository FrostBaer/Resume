import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project.type';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: []
})
export class ProjectsComponent implements OnInit {

  public projects: Project[];
  public techs: string[];
  public years: string[];
  public filter: boolean[] = [];
  public year: string = "year";
  private defaultImg: string = "../assets/projects/default.webp";

  constructor(private projService: ProjectsService) { }

  ngOnInit(): void {
    this.getProjects();
    this.getTechs();
    this.getYears();
    this.setFilter();
  }
  private getProjects() {
    this.projService.getProjects().subscribe(proj => {
      this.projects = proj.projects;
    })
  }
  private getTechs() {
    this.techs = ["Angular", "Azure", "C/C++", "C#", ".NET", ".NET Core", "Python", "Kotlin", "Java"];
  }
  private getYears() {
    this.years = ["2017", "2018", "2019", "2020", "2021", "2022", "2023", "ALL"];
  }
  private setFilter() {
    this.filter = Array(this.techs.length).fill(true);
  }
  public setYear(year) {
    console.log("year:" + year);
    this.year = year;
  }
  public getProjImage(id: number): string {
    let proj = this.projects.find(p => p.id == id);
    return proj && proj.images[0] != "" ? proj.images[0] : this.defaultImg;
  }
  public isChecked(name: string) {
    let index = this.techs.findIndex(t => t == name);
    return this.filter[index] ? true : false;
  }
  public changeTechState(name: string) {
    let index = this.techs.findIndex(t => t == name);
    if (this.filter[index]) {
      this.filter[index] = false;
    } else {
      this.filter[index] = true;
    }
  }
  public filterTech() {
    let filter: string[] = [];
    for (let i = 0; i < this.techs.length; i++) {
      if (this.filter[i]) {
        filter.push(this.techs[i]);
      }
    }
    this.projects = this.projService.getFilteredProjects(filter, this.year);
  }
}

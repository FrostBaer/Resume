import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { componentAnimation } from 'src/app/animations/component-animation';
import { Project, Dict } from 'src/app/models/project.type';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: [],
  animations: [
    componentAnimation,
    //Animation of the project-detail component
    trigger('openCloseAnimation', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'scale(0.95)',
        }),
        animate(
          '400ms ease-in',
          style({
            opacity: 1,
            transform: 'scale(1)',
          })
        ),
      ]),
      transition(':leave', [
        animate(
          '300ms ease-in',
          style({
            opacity: 0,
            transform: 'scale(0.95)',
          })
        ),
      ]),
    ]),
  ],
})
export class ProjectsComponent implements OnInit {
  public projects: Project[];
  public techs: string[];
  public years: string[];
  private filterDict: Dict = {};
  public year: string = 'year';
  private readonly defaultImg: string = '../assets/projects/default.webp';
  public isCollapsed: boolean = true;
  public openedProject: Project;

  constructor(
    private readonly projService: ProjectsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProjects();
    this.getTechs();

    /* When user navigates away from project-details other than the close button, 
    remove scroll block on body*/
    this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe(() => {
        if (this.openedProject) {
          this.projectClosed();
        }
      });
  }
  private getProjects() {
    this.projService.getProjects().subscribe((proj) => {
      this.projects = proj.projects;
    });
  }
  private getTechs() {
    this.techs = [
      'Angular',
      'Azure',
      'C++',
      'C#',
      '.NET',
      'Elixir',
      'Java',
      'Python',
      'Vue',
    ];
    this.techs.forEach((tech) => {
      this.filterDict[tech] = true;
    });
  }
  public getProjImage(id: number): string {
    let proj = this.projects.find((p) => p.id == id);
    return proj && proj.images[0] != '' ? proj.images[0] : this.defaultImg;
  }
  public isChecked(name: string) {
    return this.filterDict[name];
  }
  public changeTechState(name: string) {
    this.filterDict[name] = !this.filterDict[name];
    this.filterTech();
  }
  public filterTech() {
    this.projects = this.projService.getFilteredProjects(this.filterDict);
  }
  public projectOpened(project: Project) {
    this.openedProject = project;
    //if specific project is opened, make gallery unscrollable
    document.body.classList.add('project-detail-open');
  }
  public projectClosed() {
    this.openedProject = null;
    document.body.classList.remove('project-detail-open');
  }
}

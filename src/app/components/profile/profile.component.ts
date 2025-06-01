import { Component, OnInit } from '@angular/core';
import { Resume } from 'src/app/models/resume.type';
import { ResumeService } from 'src/app/services/resume.service';
import { Project } from 'src/app/models/project.type';
import { ProjectsService } from 'src/app/services/projects.service';
import { componentAnimation } from 'src/app/animations/component-animation';
import { Update } from 'src/app/models/updates.type';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: [],
  animations: [componentAnimation]
})
export class ProfileComponent implements OnInit {

  public resume: Resume;
  public updates: Update[];
  // public projects: Project[];

  constructor(
    private readonly resumeService: ResumeService,
    // private readonly projService: ProjectsService
  ) {}

  ngOnInit(): void {
    this.getResume();
    //this.getProjects();
    this.getUpdates();
  }

  private getResume(): void {
    this.resumeService.getResume().subscribe((r) => {
      this.resume = r;
    });
  }
  // private getProjects() {
  //   this.projService.getProjects().subscribe((proj) => {
  //     this.projects = proj.projects.slice(0, 3);
  //   });
  // }
  private getUpdates(): void {
    this.resumeService.getUpdates().subscribe((updates) => {
      this.updates = updates;
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Project } from 'src/app/models/project.type';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: [],
  providers: [NgbCarouselConfig]
})
export class ProjectDetailComponent implements OnInit {

  public project: Project;
  private defaultLink: string = "assets/projects/default_blur_shape.png";

  constructor(private config: NgbCarouselConfig,
    private projService: ProjectsService,
    private actRoute: ActivatedRoute) {
    config.interval = 10000;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = true;
  }

  ngOnInit(): void {
    this.getProjectById();    
  }
  private getProjectById() {
    this.actRoute.params.subscribe(params => {
      let id = +params['id'];
      this.projService.getProjectById(id).subscribe(proj => {
        this.project = proj;
      });
    });
  }
  public getSlides() {
    if (!this.project.images || this.project.images.every((value) => value == "")) {
      return [this.defaultLink];
    }
    else{
      return this.project.images;
    }    
  }
}

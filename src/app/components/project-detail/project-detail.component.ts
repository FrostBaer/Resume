import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { max } from 'rxjs/operators';
import { Project } from 'src/app/models/project.type';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: [],
  animations: [
    // Animation for the main image
    trigger('fullScreen', [
      state(
        'false',
        style({
          transform: 'scale(1)',
        })
      ),
      state(
        'true',
        style({
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100vw',
          height: '100vh',
          objectFit: 'contain',
          backgroundColor: 'rgba(0,0,0,0.8)',
          zIndex: 1550,
          padding: '20px',
        })
      ),
      transition('false <=> true', [animate('0.5s ease-in-out')]),
    ]),
  ],
  providers: [NgbCarouselConfig],
})
export class ProjectDetailComponent implements OnInit {
  @Input() public project: Project;
  private readonly defaultLink: string =
    'assets/projects/default_blur_shape.webp';
  public activeSlide: string;
  public isFullScreen = false;

  constructor(
    private readonly projService: ProjectsService,
    private readonly actRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.activeSlide = this.getSlides()[0];
  }
  private getProjectById() {
    this.actRoute.params.subscribe((params) => {
      let id = +params['id'];
      this.projService.getProjectById(id).subscribe((proj) => {
        this.project = proj;
      });
    });
  }
  public getSlides() {
    if (
      !this.project.images ||
      this.project.images.every((value) => value == '')
    ) {
      return [this.defaultLink];
    } else {
      return this.project.images;
    }
  }
}

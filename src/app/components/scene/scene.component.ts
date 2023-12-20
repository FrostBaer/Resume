import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { ResumeService } from 'src/app/services/resume.service';
import { SceneService } from 'src/app/services/scene.service';


@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.css']
})
export class SceneComponent implements OnInit {

  loader: boolean = true;

  constructor(private sceneService: SceneService, private resumeService: ResumeService) { }

  ngOnInit(): void {
    this.sceneService.initScene(document.querySelector('.scene') as HTMLCanvasElement);
    this.getResume();
  }

  private getResume(): void {
    this.resumeService.getResume()
      .subscribe(r => {
        this.loader = r ? false : true;
      });
  }

  @HostListener('document:scroll', ['$event'])
  public onViewportScroll() {
    this.sceneService.scroll(window.scrollY);
  }

  @HostListener('window:resize', ['$event'])
  public onResize(event) {
    console.log("width" + event.target.innerWidth);
    this.sceneService.resizeView(event.target.innerWidth, event.target.innerHeight);
  }

  public rotateLeft(bool: boolean) {
    this.sceneService.rotateLeft(bool);
  }

  public rotateRight(bool: boolean) {
    this.sceneService.rotateRight(bool);
  }

  ngOnDestroy() {
    this.sceneService.destroyScene();
  }
}

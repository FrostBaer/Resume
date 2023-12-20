import { Component, Inject, OnInit } from '@angular/core';
import { SceneService } from 'src/app/services/scene.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-light',
  templateUrl: './light.component.html',
  styleUrls: ['./light.component.css']
})
export class LightComponent implements OnInit {

  public lightUp: boolean;

  constructor(@Inject(DOCUMENT) private document: Document,
    private sceneService: SceneService) { }

  ngOnInit(): void {
    this.sceneService.lightStatus.subscribe(status => {
      this.lightUp = status;
    });
  }

  public setLight() {
    if(this.document.documentElement.getAttribute("data-bs-theme") == "dark"){
      this.document.documentElement.setAttribute("data-bs-theme", "light");
      this.sceneService.setLight(70);
    } else {
      this.document.documentElement.setAttribute("data-bs-theme", "dark");
      this.sceneService.setLight(70);
    }
    console.log("THEME: " + this.document.documentElement.getAttribute("data-bs-theme"));
  }
}

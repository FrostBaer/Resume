import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-loader',
  templateUrl: './profile-loader.component.html'
})
export class ProfileLoaderComponent implements OnInit {

  favourites: number[]
  hobbies: number[]
  languages: number[]

  ngOnInit(): void {
    this.favourites = Array(5).fill(0);
    this.hobbies = Array(4).fill(0);
    this.languages = Array(3).fill(0);
  }

}

import { Component, OnInit } from '@angular/core';
import { Resume } from 'src/app/models/resume.type';
import { ResumeService } from 'src/app/services/resume.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: []
})
export class ProfileComponent implements OnInit {

  public resume: Resume;

  constructor(private resumeService: ResumeService) {}

  ngOnInit(): void {
    this.getResume();
  }

  private getResume(): void {
    this.resumeService.getResume()
      .subscribe(r => this.resume = r);
  }

}

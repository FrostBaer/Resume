import { Component, OnInit } from '@angular/core';
import { Resume } from 'src/app/models/resume.type';
import { ResumeService } from 'src/app/services/resume.service';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: []
})
export class ResumeComponent implements OnInit {

  public resume: Resume;

  constructor(private resumeService: ResumeService) { }

  ngOnInit(): void {
    this.resumeService.getResume()
      .subscribe(r => this.resume = r);
  }
}
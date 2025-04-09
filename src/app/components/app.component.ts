import { Component } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { ToastrService } from 'ngx-toastr';
import { ResumeService } from '../services/resume.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent {
  activeContact = false;
  data = false;
  public isCollapsed = false;

  constructor(
    private readonly profileService: ProfileService,
    private readonly resumeService: ResumeService,
    private readonly clipboard: Clipboard,
    private readonly toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  changeContact() {
    this.activeContact = !this.activeContact;
  }

  getPhone() {
    this.clipboard.copy(this.profileService.contactData.phone);
    this.toastr.info('Phone number copied to clipboard!');
  }

  getEmail() {
    this.clipboard.copy(this.profileService.contactData.email);
    this.toastr.info('E-mail copied to clipboard!');
  }

  private getData(): void {
    try {
      this.resumeService.getResume().subscribe((r) => {
        this.data = true;
      });
    } catch (error) {
      console.error(error);
    }
  }
}

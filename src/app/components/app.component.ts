import { Component } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent {
  phone: string = "assets/icons/telephone.svg";
  mail: string = "assets/icons/mail.svg";
  activeContact = false;

  constructor(private profileService: ProfileService,
    private clipboard: Clipboard,
    private toastr: ToastrService) { }

  changeContact() {
    this.activeContact = this.activeContact ? false : true;
  }

  getPhone() {
    this.clipboard.copy(this.profileService.contactData.phone);
    this.toastr.info('Phone number copied to clipboard!');
  }

  getEmail() {
    this.clipboard.copy(this.profileService.contactData.email);
    this.toastr.info('E-mail copied to clipboard!');
  }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ContactData } from '../models/contact.type';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private url: string = "https://resume-func-app.azurewebsites.net/api/"
  
  public contactData: ContactData = {
    lastName: '',
    firstName: '',
    phone: 'missing number',
    email: 'missing e-mail',
    location: ''
  };

  constructor(private http: HttpClient) { 
    this.getContact().subscribe( c => {
      this.contactData = c;
    });
  }

  private getContact(){
    let activeUrl = this.url + "GetContactData";
    let contact = this.http.get<ContactData>(activeUrl);
    return contact;
  }
}

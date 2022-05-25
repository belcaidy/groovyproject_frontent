import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  announcementListURL = 'http://localhost:8080/api/announcement/index'; //get
  announcementListForCustomerDashboardURL = 'http://localhost:8080/api/announcement/customerDashboard'; //get
  gateAnnouncementByIdURL = 'http://localhost:8080/api/announcement/get'; //get
  createAnnouncementURL = 'http://localhost:8080/api/announcement/create'; //post
  updateAnnouncementURL = 'http://localhost:8080/api/announcement/update'; //post or put
  deleteAnnouncementURL = 'http://localhost:8080/api/announcement/delete'; //delete
  customerAnnouncement = 'http://localhost:8080/api/announcement/customerAnnouncement'; //get

  constructor(private http: HttpClient) {
  }

  getAnnouncementList(): any {
    return this.http.get(this.announcementListURL);
  }

  getCustomerAnnouncementList(): any {
    return this.http.get(`${this.announcementListForCustomerDashboardURL}`);
  }

  getAnnouncementById(id): any {
    return this.http.get(`${this.gateAnnouncementByIdURL}/${id}`);
  }

  getAnnouncementByCustomerName(name): any {
    return this.http.get(`${this.customerAnnouncement}/${name}`);
  }

  createAnnouncement(value: FormData): any {
    return this.http.post(`${this.createAnnouncementURL}`, value);
  }

  updateAnnouncement(value: any): any {
    return this.http.post(`${this.updateAnnouncementURL}`, value);
  }

  deleteAnnouncement(id): any {
    return this.http.delete(`${this.deleteAnnouncementURL}/${id}`);
  }

}

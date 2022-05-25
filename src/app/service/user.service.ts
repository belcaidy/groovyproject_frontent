import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseLoginURL = 'http://localhost:8080/api/login'; //post
  baseLogoutURL = 'http://localhost:8080/api/logout'; //post
  baseRegistrationURL = 'http://localhost:8080/api/user/registration'; //post
  baseCustomerRegistrationURL = 'http://localhost:8080/api.user/registration';
  baseUserListURL = 'http://localhost:8080/api/user/list'; //get
  baseUserByIdURL = 'http://localhost:8080/api/user/getUser'; //get
  baseUserUpdateByAdminURL = 'http://localhost:8080/api/user/updateByAdmin'; //put or post
  baseUserUpdateByCustomerURL = 'http://localhost:8080/api/user/updateByCustomer'; //put or post
  baseUserDeleteUserByAdminURL = 'http://localhost:8080/api/user/deleteUserBySuperAdmin'; //delete

  constructor(private http: HttpClient, private router: Router) {
  }

  login(data: any): any {
    return this.http.post(this.baseLoginURL, data);
  }

  logout(): any {
    localStorage.clear();
    this.http.post(this.baseLogoutURL, {});
    window.location.href = '/login';
  }

  getUserById(id): any {
    return this.http.get(`${this.baseUserByIdURL}/${id}`);
  }

  registration(data: any): any {
    return this.http.post(this.baseRegistrationURL, data);
  }

  getRole(): any {
    const parseAuth = JSON.parse(localStorage.getItem('auth'));
    if (parseAuth === null) {
      return null;
    }
    return parseAuth.roles[0] === 'ROLE_ADMIN';
  }

  getCustomerRole(): any {
    const parseCustomerAuth = JSON.parse(localStorage.getItem('auth'));
    if (parseCustomerAuth === null) {
      return null;
    }
    return parseCustomerAuth.roles[0] === 'ROLE_CUSTOMER';
  }

  getUserList(): any {
    return this.http.get(this.baseUserListURL);
  }

  getUser(): any {
    return !!JSON.parse(localStorage.getItem('auth'));
  }

  getUserName(): any {
    return JSON.parse(localStorage.getItem('auth')).username;
  }

  getData(): any {
    const asd = JSON.parse(localStorage.getItem('auth'));
    if (asd === null) {
      return null;
    }
    return !!asd.access_token;
  }

  updateUser(payload: any): any {
    return this.http.post(this.baseUserUpdateByAdminURL, payload);
  }

  deleteUserBySuperAdmin(id): any {
    return this.http.delete(`${this.baseUserDeleteUserByAdminURL}/${id}`);

  }

}

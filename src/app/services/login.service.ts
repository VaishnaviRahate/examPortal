import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  //This is a subject -> using subject we can send data anywhere 
  //Whichever page will subscribe this subject will get notify accordingly 
  //as soon as it calls next method of subscribe
  //for eg: Check for LoginComponent.ts and navbar.ts 
  public loginStatusSubject = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  //to get crrent user details from backend who is logged in 
  public getCurrentUser() {
    return this.http.get(`${baseUrl}/current-user`);
  }


  //generate token
  public generateToken(loginData: any) {
    return this.http.post(`${baseUrl}/generate-token`, loginData);
  }

  //login user : this method will store generated token in local storage
  public loginUser(token: string) {
    localStorage.setItem('token', token);
    return true;
  }

  //isLoggedIn : this method will check if user is logged in or not by fetching token from local storage
  public isLoggedIn() {
    let tokenStr = localStorage.getItem('token');
    if (tokenStr == undefined || tokenStr == '' || tokenStr == null) {
      return false;
    }
    else {
      return true;
    }
  }

  //logout : this method will remove token which is stored in local storage 
  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  //getToken : this method will fetch(return) token which is stored in local storage
  public getToken() {
    return localStorage.getItem('token');
  }

  //set user details in local storage
  public setUser(user: any) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  //to fetch(return) user details from localStorage
  public getUser() {
    let userStr = localStorage.getItem("user");
    if (userStr != null) {
      return JSON.parse(userStr);
    }
    else {
      this.logout();
      return null;
    }
  }


  //getUserRole : this method will return the role of user/authorities of the user i.e.Admin/Normal/Both
  public getUserRole() {
    let user = this.getUser();
    return user.authorities[0].authority; //In case of only single role to each user
    //return user.authorities;   //In case of multiple roles to any user or we can use this for single role to one user as well
  }

}

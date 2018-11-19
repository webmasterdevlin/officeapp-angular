import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UserModel } from "../models/user.model";
import { Endpoints } from "../helpers/constants";
import { Observable } from "rxjs";
import { NgForm } from "@angular/forms";
import { LoginModel } from "../models/login.model";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private http: HttpClient) {}

  signin(loginModel: LoginModel): Observable<any> {
    return this.http.post<LoginModel>(Endpoints.loginUrl, loginModel, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }

  signup(user: UserModel): Observable<any> {
    return this.http.post<UserModel>(Endpoints.registerUrl, user, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }
}

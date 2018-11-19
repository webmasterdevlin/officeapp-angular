import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {JwtHelper} from 'angular2-jwt';
import {Router} from '@angular/router';
import {DepartmentService} from '../../../services/department.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  departments: any;

  constructor(
    private _location: Location,
    private jwtHelper: JwtHelper,
    private router: Router,
    private departmentService: DepartmentService,
  ) {}

  ngOnInit() {
    this.departmentService.loadDepartments().subscribe(data => this.departments = data);
  }

  alert(args: any) {
    alert(`I am ${args.name}`);
  }

  isUserAuthenticated() {
    const token: string = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    } else {
      return false;
    }
  }

  logOut() {
    localStorage.removeItem("jwt");
  }
}

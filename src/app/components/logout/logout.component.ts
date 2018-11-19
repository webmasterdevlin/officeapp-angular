import { Component, OnInit } from '@angular/core';
import {JwtHelper} from 'angular2-jwt';
import {Router} from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
})
export class LogoutComponent implements OnInit {

  constructor(private jwtHelper: JwtHelper, private router: Router) { }

  ngOnInit() {
    localStorage.removeItem('jwt');
    this.router.navigateByUrl('/login');
  }

}

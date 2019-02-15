import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.css']
})
export class HeaderMenuComponent {

  constructor(private router: Router) {
  }

  isUserAuthenticated() {
    const token: string = localStorage.getItem('jwt');
    const jwtHelper = new JwtHelperService();
    return token && !jwtHelper.isTokenExpired(token);
  }

  logOut() {
    localStorage.removeItem('jwt');
    this.router.navigateByUrl('/login');
  }
}

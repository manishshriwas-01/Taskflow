import { Component } from '@angular/core';
import { RouterLink,Router } from '@angular/router';
import { AuthService } from '../services/auth';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,MatToolbarModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  constructor(
    public authService: AuthService,
      private router: Router
  ) { }


  logout() {

    this.authService.logout();
   

    this.router.navigate(
      ['/login']
    );

  }
};

import {Component, inject} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  authService: AuthService = inject(AuthService);
  router = inject(Router)
  public isAuth = false;

  ngOnInit() {
    this.router.events.subscribe(() => {
      this.isAuth = this.authService.isAuth();
    })
  }

  logout() {
    this.authService.logout();
  }
}

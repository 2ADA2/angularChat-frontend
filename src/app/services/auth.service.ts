import {inject, Injectable} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {tap} from "rxjs";
import {FormInterface, TokenInterface} from "./auth.interface";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient);
  cookieService: CookieService = inject(CookieService)
  router = inject(Router);

  private apiUrl = environment.apiUrl
  token: string | null = null;

  isAuth() {
    if (!this.token) {
      this.token = this.cookieService.get("token")
    }
    return !!this.token
  }

  logout() {
    this.token = null;
    this.cookieService.delete("token");
    this.router.navigateByUrl("/login")
  }

  enter(form: FormInterface, method: string) {
    return this.http.post<TokenInterface>(this.apiUrl + "users/" + method, {
      username: form.username,
      password: form.password,
    }).pipe(
      tap((val) => {
        if (!val.token) return
        this.cookieService.set("token", val.token);
        this.token = val.token
        this.router.navigate(['/']);
      })
    );
  }
}

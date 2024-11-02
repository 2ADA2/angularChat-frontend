import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service"
import {Router} from "@angular/router";

export const canActivateAuth = () => {
  const isLoggedIn = inject(AuthService).isAuth()
  const router = inject(Router);

  if (isLoggedIn) {
    return true;
  }
  return router.createUrlTree(["/login"])
}

export const cannotActivateAuth = () => {
  const isLoggedIn = inject(AuthService).isAuth()
  const router = inject(Router);
  if (isLoggedIn) {
    return router.createUrlTree(["/"])
  }
  return true
}

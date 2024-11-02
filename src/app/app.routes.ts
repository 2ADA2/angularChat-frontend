import { Routes } from '@angular/router';
import {ChatComponent} from "./chat/chat.component";
import {RegisterComponent} from "./auth/register/register.component";
import {LoginComponent} from "./auth/login/login.component";
import {canActivateAuth, cannotActivateAuth} from "./auth/access.guard";

export const routes: Routes = [
  {path:"", children:[
      {path:"", component:ChatComponent}
    ],
 canActivate:[canActivateAuth]
  },

  {path:"", children:[
      {path:"register", component:RegisterComponent},
      {path:"login", component:LoginComponent},
    ],
    canActivate:[cannotActivateAuth]
    },
];

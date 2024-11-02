import {Component, inject} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  authService :AuthService = inject(AuthService);
  form:FormGroup = new FormGroup({
    username: new FormControl(""),
    password: new FormControl("")
  })

  register(e:MouseEvent) {
    e.preventDefault();
    this.authService.enter({
      username:this.form.value.username,
      password:this.form.value.password,
    },"register").subscribe()
  }
}

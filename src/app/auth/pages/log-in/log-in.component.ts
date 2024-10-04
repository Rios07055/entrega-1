import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './log-in.component.html',
})
export class LogInComponent {
  logInForm!: FormGroup;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.logInForm = this.formBuilder.nonNullable.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onLogin() {
    if (!this.logInForm.valid) {
      Swal.fire({
        text: 'Digilencia los campos correctamente',
        icon: 'error',
      });
      return;
    }

    let username = this.logInForm.value.username;
    let password = this.logInForm.value.password;

    const response = this.userService.logIn(username, password);

    if (response.success) {
      Swal.fire({
        text: 'Inicio exitoso',
        icon: 'success',
      });
      this.router.navigate(['/home']);
    } else {
      Swal.fire({
        text: response.message,
        icon: 'error',
      });
    }
  }
}

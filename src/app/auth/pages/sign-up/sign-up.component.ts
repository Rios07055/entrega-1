import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
})
export class SignUpComponent {
  signUpForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.signUpForm = this.formBuilder.nonNullable.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(17),
          Validators.pattern(/^[a-zA-Z][a-zA-Z0-9]{7,14}$/),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(17),
        ],
      ],
      confirmPass: ['', [Validators.required]],
    });
  }

  onSignUp() {
    if (!this.signUpForm.valid) {
      Swal.fire({
        title: 'Mal registro',
        text: 'Diligencia los campos correctamente',
        icon: 'error',
      });
      return;
    }

    const username = this.signUpForm.value.username;
    const email = this.signUpForm.value.email;
    const password = this.signUpForm.value.password;
    const confirmPass = this.signUpForm.value.confirmPass;

    if (password !== confirmPass) {
      Swal.fire({
        title: 'Las contraseñas no coinciden',
        text: 'Inténtalo de nuevo',
        icon: 'error',
      });
      return;
    }

    const response = this.userService.signUp({ username, password, email });
    if (response.success) {
      Swal.fire({
        title: 'Registro exitoso!',
        icon: 'success',
      });
      this.router.navigate(['/home']);
    } else {
      Swal.fire({
        title: 'Error en el registro',
        text: response.message,
        icon: 'error',
      });
    }
  }
}

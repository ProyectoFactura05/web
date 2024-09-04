// src/app/pages/login/login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { LoginRequest } from '../../models/loginRequest.interface';
import { LoginResponse } from '../../models/loginResponse.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [CommonModule, ReactiveFormsModule],
  styleUrls: ['./login.component.css'],
  standalone: true
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const loginRequest: LoginRequest = this.loginForm.value;
      this.loginService.login(loginRequest).subscribe((response: LoginResponse) => {
        // Guardar el token en el localStorage
        localStorage.setItem('token', response.token);
        localStorage.setItem('email',loginRequest.email);
        alert('¡Sesión Iniciada!');
        console.log('Login successful!', response);

        // Redirige a la página principal u otra página después de iniciar sesión
        this.router.navigate(['/dashboard']);
      }, error => {
        console.error('Error during login', error);
        alert('Error al iniciar sesión. Verifica tus credenciales.');
      });
    }
  }
}

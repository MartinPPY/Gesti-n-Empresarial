import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {

  private router = inject(Router)
  private authService = inject(Auth);
  private fb: FormBuilder = inject(FormBuilder);
  form = this.fb.group({
    name: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    role: ['', [Validators.required]]
  })
  subbmited: boolean = false;
  errorMessage: string = '';
  error: boolean = false;


  hasError(controlName: string, errorName: string) {
    return this.form.get(controlName)!.hasError(errorName) && this.form.get(controlName)!.touched;
  }

  register() {
    this.subbmited = true;
    if (this.form.invalid) {
      this.errorMessage = 'Por favor completa todos los campos correctamente.';
      this.error = true;
      return;
    }

    const { name, lastName, email, password, role } = this.form.value;

    this.authService.register(name!, lastName!, email!, password!, role!).subscribe({
      next: (res) => {
        console.log(res);
        this.errorMessage = '';
        this.subbmited = false;
        this.form.reset();
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          text: 'El usuario ha sido registrado correctamente.',
          confirmButtonText: 'Aceptar'
        });
        this.router.navigate(['/log-in']);
      },
      error: (err) => {
        this.error = true;
        console.log(err);
        this.errorMessage = err.error.message || 'Error al registrar el usuario.';
      }
    })

  }

}

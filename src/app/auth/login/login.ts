import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {

  private router: Router = inject(Router);
  private authService: Auth = inject(Auth);
  private fb: FormBuilder = inject(FormBuilder);
  form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  })
  submitted: boolean = false;







  hasError(controlName: string, errorName: string) {
    return this.form.controls[controlName].hasError(errorName) && this.form.get(controlName)?.touched;
  }

  login() {
    this.submitted = true;
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    const email: string = this.form.get('email')?.value;
    const password: string = this.form.get('password')?.value;

    this.authService.login(email, password).subscribe({
      next: (response: { role: string }) => {
        if(response.role === 'Administrador'){
          this.router.navigate(['/admin']);
        }
      },
      error: (error) => {
        console.error('Login failed', error);
      }
    })

  }


}

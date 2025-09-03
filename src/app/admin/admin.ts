import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Auth } from '../services/auth';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-admin',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './admin.html',
  styleUrl: './admin.scss'
})
export class Admin implements OnInit {


  private router: Router = inject(Router)
  private authServie = inject(Auth)


  ngOnInit(): void {
    
  }

  async logOut() {
    await lastValueFrom(this.authServie.logOut())
    this.router.navigate(['/log-in'])
  }

}  

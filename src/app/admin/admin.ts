import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './admin.html',
  styleUrl: './admin.scss'
})
export class Admin implements OnInit {

  
  private router: Router = inject(Router)


  ngOnInit(): void {
    
  }

  logOut() {
    this.router.navigate(['/log-in'])
  }

}  

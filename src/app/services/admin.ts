import { inject, Injectable } from '@angular/core';
import { routes } from '../app.routes';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Admin {

  private http: HttpClient = inject(HttpClient);


  getUsers(): Observable<any> {
    return this.http.get(`${routes}/admin/users`)
  }

}

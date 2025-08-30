import { inject, Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { route } from './route';

@Injectable({
  providedIn: 'root'
})
export class Admin {

  private http: HttpClient = inject(HttpClient);


  getUsers(): Observable<any> {
    return this.http.get(`${route}/admin/users`)
  }

  deleteUser(email: string): Observable<any> {
    return this.http.delete(`${route}/admin/user/${email}`);
  }

  getUser(name: string, role: string): Observable<any> {
    return this.http.get(`${route}/admin/user`, { params: { name: name, role: role } });
  }




}

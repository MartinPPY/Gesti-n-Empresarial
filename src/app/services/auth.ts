import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { route } from './route';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private http: HttpClient = inject(HttpClient);

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${route}/auth/log-in`, { email, password }, { withCredentials: true })
  }

  register(name: string, lastName: string, email: string, password: string, role: string): Observable<any> {
    return this.http.post(`${route}/auth/register`, { name, lastName, email, password, role })
  }

  isAuthenticated(): Observable<any> {
    return this.http.get(`${route}/auth/is-authenticated`, { withCredentials: true })
  }

  logOut():Observable<any>{
    return this.http.get(`${route}/auth/log-out`, { withCredentials: true })
  }

}

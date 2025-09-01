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

  addProject(name: string, dateInit: string, dateEnd: string): Observable<any> {
    return this.http.post(`${route}/admin/project`, { name, dateInit, dateEnd })
  }

  getProjects(): Observable<any> {
    return this.http.get(`${route}/admin/projects`)
  }

  getProject(name: string, dateInit: string, dateEnd: string, state: string, id: number): Observable<any> {
    return this.http.get(`${route}/admin/project`, {
      params: {
        name: name,
        dateInit: dateInit,
        dateEnd: dateEnd,
        state: state,
        id: id
      }
    })
  }

  updateProject(name: string, dateInit: string, dateEnd: string, state: string, id: number): Observable<any> {
    return this.http.put(`${route}/admin/project`, { name, dateInit, dateEnd, state, id })
  }

  deleteProject(id: number): Observable<any> {
    return this.http.delete(`${route}/admin/project/${id}`)
  }

  filterProjects(search: string, state: string): Observable<any> {
    return this.http.get(`${route}/admin/filter-projects`, {
      params: {
        search: search,
        state: state
      }
    })
  }

  getEmployees(): Observable<any> {
    return this.http.get(`${route}/admin/employees`)
  }

  addTask(name: string, state: string, priority: string, employeeId: number, projectId: number): Observable<any> {
    return this.http.post(`${route}/admin/task`, { name, state, priority, employeeId, projectId })
  }

  getTasks(): Observable<any> {
    return this.http.get(`${route}/admin/tasks`)
  }

  getTask(id: number): Observable<any> {
    return this.http.get(`${route}/admin/task`, { params: { id: id } })
  }

  updateTask(name: string, state: string, priority: string, employeeId: number, projectId: number, id: number): Observable<any> {
    return this.http.put(`${route}/admin/task`, { name, state, priority, employeeId, projectId, id })
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${route}/admin/task/${id}`, {})
  }

  filterTask(search: string, state: string, priority: string): Observable<any> {
    return this.http.get(`${route}/admin/filter-task`, {
      params: {
        search: search,
        state: state,
        priority: priority
      }
    })
  }

  /* Recursos */

  getResources():Observable<any>{
    return this.http.get(`${route}/admin/resources`)
  }

  addResource(name: string, projectId: number): Observable<any> {
    return this.http.post(`${route}/admin/resource`, { name, projectId })
  }







}

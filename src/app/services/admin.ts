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
    return this.http.get(`${route}/admin/users`, { withCredentials: true })
  }

  deleteUser(email: string): Observable<any> {
    return this.http.delete(`${route}/admin/user/${email}`, { withCredentials: true });
  }

  getUser(name: string, role: string): Observable<any> {
    return this.http.get(`${route}/admin/user`, { params: { name: name, role: role }, withCredentials: true });
  }

  addProject(name: string, dateInit: string, dateEnd: string): Observable<any> {
    return this.http.post(`${route}/admin/project`, { name, dateInit, dateEnd }, { withCredentials: true })
  }

  getProjects(): Observable<any> {
    return this.http.get(`${route}/admin/projects`, { withCredentials: true })
  }

  getProject(name: string, dateInit: string, dateEnd: string, state: string, id: number): Observable<any> {
    return this.http.get(`${route}/admin/project`, {
      params: {
        name: name,
        dateInit: dateInit,
        dateEnd: dateEnd,
        state: state,
        id: id
      },
      withCredentials: true
    })
  }

  updateProject(name: string, dateInit: string, dateEnd: string, state: string, id: number): Observable<any> {
    return this.http.put(`${route}/admin/project`, { name, dateInit, dateEnd, state, id }, { withCredentials: true })
  }

  deleteProject(id: number): Observable<any> {
    return this.http.delete(`${route}/admin/project/${id}`, { withCredentials: true })
  }

  filterProjects(search: string, state: string): Observable<any> {
    return this.http.get(`${route}/admin/filter-projects`, {
      params: {
        search: search,
        state: state
      },
      withCredentials: true
    })
  }

  getEmployees(): Observable<any> {
    return this.http.get(`${route}/admin/employees`, { withCredentials: true })
  }

  addTask(name: string, state: string, priority: string, employeeId: number, projectId: number): Observable<any> {
    return this.http.post(`${route}/admin/task`, { name, state, priority, employeeId, projectId }, { withCredentials: true })
  }

  getTasks(): Observable<any> {
    return this.http.get(`${route}/admin/tasks`, { withCredentials: true })
  }

  getTask(id: number): Observable<any> {
    return this.http.get(`${route}/admin/task`, { params: { id: id }, withCredentials: true })
  }

  updateTask(name: string, state: string, priority: string, employeeId: number, projectId: number, id: number): Observable<any> {
    return this.http.put(`${route}/admin/task`, { name, state, priority, employeeId, projectId, id }, { withCredentials: true })
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${route}/admin/task/${id}`, { withCredentials: true })
  }

  filterTask(search: string, state: string, priority: string): Observable<any> {
    return this.http.get(`${route}/admin/filter-task`, {
      params: {
        search: search,
        state: state,
        priority: priority
      },
      withCredentials: true
    })
  }

  /* Recursos */

  getResources(): Observable<any> {
    return this.http.get(`${route}/admin/resources`, { withCredentials: true })
  }

  addResource(name: string, projectId: number): Observable<any> {
    return this.http.post(`${route}/admin/resource`, { name, projectId }, { withCredentials: true })
  }

  getResource(id: number): Observable<any> {
    return this.http.get(`${route}/admin/resource/${id}`, { withCredentials: true })
  }

  deleteResource(id: number): Observable<any> {
    return this.http.delete(`${route}/admin/resource/${id}`, { withCredentials: true })
  }

  updateResource(name: string, projectId: number, id: number): Observable<any> {
    return this.http.put(`${route}/admin/resource`, { name, projectId, id }, { withCredentials: true })
  }

  filterResources(search: string): Observable<any> {
    return this.http.get(`${route}/admin/filter-resources`, { params: { search: search }, withCredentials: true })
  }

  /* rutas de empleado */

  getTasksFromUser(): Observable<any> {
    return this.http.get(`${route}/employee/tasks`, { withCredentials: true })
  }









}

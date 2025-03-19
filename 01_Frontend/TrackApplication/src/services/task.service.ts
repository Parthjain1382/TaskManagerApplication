import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}


  // Fetch all tasks
  getTasks(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  // Add a new task
  addTask(task: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, task);
  }

  // Update a task
  updateTask(taskId: string, updatedTask: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${taskId}`, updatedTask);
  }

  // Delete a task
  deleteTask(taskId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${taskId}`);
  }
}

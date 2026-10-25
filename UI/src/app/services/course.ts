import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:5120/api/courses';

  getAll(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl);
  }
}

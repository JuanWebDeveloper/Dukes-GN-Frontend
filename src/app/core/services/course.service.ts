import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ApiToCourseMapper } from '../mappers/api-to-course.mapper';
import { Course } from '../models/Course';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private headers: HttpHeaders;
  constructor(
    private http: HttpClient,
    private apiToCourseMapper: ApiToCourseMapper
  ) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': environment.baseURL,
    });
  }

  /**
   * Servicio para crear un curso.
   * @param course
   */
  public createCourse(course: Course): Observable<Course> {
    return this.http
      .post<Course>(`${environment.baseURL}course/create`, course, {
        headers: this.headers,
      })
      .pipe(
        map((response: Course) => this.apiToCourseMapper.mapCourse(response))
      );
  }

  /**
   * Servicio para obtener los cursos de un programa.
   * @param programId
   **/
  public getCourse(programId: string): Observable<Course[]> {
    return this.http
      .get<Course[]>(`${environment.baseURL}course/program/${programId}`, {
        headers: this.headers,
      })
      .pipe(
        map((response: Course[]) => this.apiToCourseMapper.mapCourses(response))
      );
  }
}

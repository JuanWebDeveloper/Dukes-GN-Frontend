import { Injectable } from '@angular/core';
import { Course } from '../models/Course';

@Injectable({
  providedIn: 'root',
})
export class ApiToCourseMapper {
  /**
   * Mapea un objeto de la API a un objeto de tipo Course.
   * @param course
   * @returns courseMapped
   */
  public mapCourse(course: Course): Course {
    const courseMapped: Course = {
      id_course: course.id_course,
      id_program: course.id_program,
      name: course.name,
      percentage: course.percentage,
    };

    return courseMapped;
  }

  /**
   * Mapea un array de objetos de la API a un array de objetos de tipo Course.
   * @param courses
   * @returns coursesMapped
   */
  public mapCourses(courses: Course[]): Course[] {
    return courses.map((course) => this.mapCourse(course));
  }
}

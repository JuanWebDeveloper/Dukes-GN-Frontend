import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ApiToModuleMapper } from '../mappers/api-to-module.mapper';
import { Module } from '../models/Module';

@Injectable({
  providedIn: 'root',
})
export class ModuleService {
  private headers: HttpHeaders;
  constructor(
    private http: HttpClient,
    private apiToModuleMapper: ApiToModuleMapper
  ) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': environment.baseURL,
    });
  }

  /**
   * Servicio para crear un módulo.
   * @param module
   **/
  public createModule(module: Module): Observable<Module> {
    return this.http
      .post<Module>(`${environment.baseURL}module/create`, module, {
        headers: this.headers,
      })
      .pipe(
        map((response: Module) => this.apiToModuleMapper.mapModule(response))
      );
  }

  /**
   * Servicio para obtener los módulos de un curso.
   * @param courseId
   */
  public getModule(courseId: string): Observable<Module[]> {
    return this.http
      .get<Module[]>(`${environment.baseURL}module/course/${courseId}`, {
        headers: this.headers,
      })
      .pipe(
        map((response: Module[]) => this.apiToModuleMapper.mapModules(response))
      );
  }
}

import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ApiToProgramMapper } from '../mappers/api-to-program.mapper';
import { Program } from '../models/Program';

@Injectable({
  providedIn: 'root',
})
export class ProgramService {
  private headers: HttpHeaders;
  constructor(
    private http: HttpClient,
    private apiToProgramMapper: ApiToProgramMapper
  ) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': environment.baseURL,
    });
  }

  /**
   * Servicio para crear un programa.
   * @param program
   **/
  public createProgram(program: Program): Observable<Program> {
    return this.http
      .post<Program>(`${environment.baseURL}program/create`, program, {
        headers: this.headers,
      })
      .pipe(
        map((response: Program) => this.apiToProgramMapper.mapProgram(response))
      );
  }

  /**
   * Servicio para obtener un programa.
   * @param id
   **/
  public getProgram(coachId: string): Observable<Program> {
    return this.http
      .get<Program[]>(`${environment.baseURL}program/coach/${coachId}`, {
        headers: this.headers,
      })
      .pipe(
        map((response: Program[]) => {
          return this.apiToProgramMapper.mapProgram(response[0]);
        })
      );
  }

  /**
   * Servicio para obtener el listado de programas.
   */
  public listAllPrograms(): Observable<Program[]>{
    return this.http
      .get<Program[]>(`${environment.baseURL}program/list`, {
        headers: this.headers,
      })
      .pipe(
        map((response: Program[]) => this.apiToProgramMapper.mapPrograms(response))
      );
  }
}

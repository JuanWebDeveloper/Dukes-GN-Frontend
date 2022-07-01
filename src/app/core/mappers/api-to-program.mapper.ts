import { Injectable } from '@angular/core';
import { Program } from '../models/Program';

@Injectable({
  providedIn: 'root',
})
export class ApiToProgramMapper {
  /**
   * Mapea un objeto de la API a un objeto de tipo Program.
   * @param program
   * @returns programMapped
   */
  public mapProgram(program: Program): Program {
    const programMapped: Program = {
      id_program: program.id_program,
      name: program.name,
      start_date: program.start_date,
      final_date: program.final_date,
      id_coach: program.id_coach,
      name_coach: program.name_coach,
      duration_day: program.duration_day,
      course_amount: program.course_amount,
      course_percentage: program.course_percentage,
    };

    return programMapped;
  }

  /**
   * Mapea un array de objetos de la API a un array de objetos de tipo Program.
   * @param programs
   * @returns programsMapped
   */
  public mapPrograms(programs: Program[]): Program[] {
    return programs.map((program) => this.mapProgram(program));
  }
}

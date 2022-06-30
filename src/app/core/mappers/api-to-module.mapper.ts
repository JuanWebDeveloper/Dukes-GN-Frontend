import { Injectable } from '@angular/core';
import { Module } from '../models/Module';

@Injectable({
  providedIn: 'root',
})
export class ApiToModuleMapper {
  /**
   * Mapea un objeto de la API a un objeto de tipo Module.
   * @param module
   * @returns moduleMapped
   */
  public mapModule(module: Module): Module {
    const moduleMapped: Module = {
      id_course: module.id_course,
      name: module.name,
      percentage: module.percentage,
      duration: module.duration,
    };

    return moduleMapped;
  }

  /**
   * Mapea un array de objetos de la API a un array de objetos de tipo Module.
   * @param Modules
   * @returns modulesMapped
   */
  public mapModules(modules: Module[]): Module[] {
    return modules.map((module) => this.mapModule(module));
  }
}

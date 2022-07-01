import {Component, OnDestroy, OnInit} from '@angular/core';

import {Program} from "src/app/core/models/Program";
import {ProgramService} from "src/app/core/services/program.service";

@Component({
  selector: 'dukes-list-program',
  templateUrl: './list-program.component.html',
  styleUrls: ['./list-program.component.scss']
})
export class ListProgramComponent implements OnInit, OnDestroy {

  public programs: Program[] | undefined;
  public loading: boolean = true;

  constructor(private programService: ProgramService) { }

  ngOnInit(): void {
    this.programService.listAllPrograms().subscribe((programs: Program[]) => {
      this.programs = programs;
      this.loading = false;
    })
  }

  ngOnDestroy() {
    this.programs = undefined;
    this.loading = true;
  }

}

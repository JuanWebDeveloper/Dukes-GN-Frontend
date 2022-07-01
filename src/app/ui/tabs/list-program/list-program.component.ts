import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
// @ts-ignore
import * as XLSX from 'xlsx';

import { Program } from 'src/app/core/models/Program';
import { ProgramService } from 'src/app/core/services/program.service';

/* Importaciones para hacer uso del paquete que permite crear y exportar PDFs */
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
const htmlToPdfmake = require('html-to-pdfmake');
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'dukes-list-program',
  templateUrl: './list-program.component.html',
  styleUrls: ['./list-program.component.scss'],
})
export class ListProgramComponent implements OnInit, OnDestroy {
  public programs: Program[] | undefined;
  public loading: boolean = true;
  public fileName = 'DukesGN-ListadoProgramas.xlsx';

  constructor(private programService: ProgramService) {}

  ngOnInit(): void {
    this.programService.listAllPrograms().subscribe((programs: Program[]) => {
      this.programs = programs;
      this.loading = false;
    });
  }

  ngOnDestroy() {
    this.programs = undefined;
    this.loading = true;
  }

  exportToExcel(): void {
    /* Pasar el id de la tabla */
    let element: any = document.getElementById('excel-table');
    let spans: any = document.querySelectorAll('#excel-table span');
    let buttons: any = document.querySelectorAll('#pdfTable button');
    spans.forEach((span: any) => span.remove());
    buttons.forEach((button: any) => button.remove());
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* Genera el workbook y adiciona el worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* Guarda el archivo */
    XLSX.writeFile(wb, this.fileName);
  }

  /* Genera el archivo PDF a partir de los datos de la tabla */
  @ViewChild('pdfTable')
  pdfTable!: ElementRef;

  public downloadAsPDF() {
    const pdfTable = this.pdfTable.nativeElement;
    let spans: any = document.querySelectorAll('#pdfTable span');
    let buttons: any = document.querySelectorAll('#pdfTable button');
    spans.forEach((span: any) => span.remove());
    buttons.forEach((button: any) => button.remove());
    let html = htmlToPdfmake(pdfTable.innerHTML);
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).download();
  }
}

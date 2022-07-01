import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
// @ts-ignore
import * as XLSX from 'xlsx';

/* Importaciones para hacer uso del paquete que permite crear y exportar PDFs */
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
const htmlToPdfmake = require('html-to-pdfmake');
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'dukes-table-progress',
  templateUrl: './table-progress.component.html',
  styleUrls: ['./table-progress.component.scss']
})
export class TableProgressComponent implements OnInit {

  public loading: boolean = true;
  public fileName = 'DukesGN-ProgresoTabla.xlsx';

  data = [65, 59, 80, 81, 56, 55, 40, 100, 98, 100, 85, 70, 100, 95];
  labels = [
    'Fundamentos de Diseño',
    'DDD',
    'Spring Boot 2.0',
    'Fundamentos de Angular',
    'Diseño Web 2.0',
    'RxJs',
    'Reactor Core 3.0',
    'Spring Boot Destilado',
    'Aplicaciones Empresariales',
    'Arquitecturas Limpias',
    'Arquitecturas Limpias',
    'Arquitecturas Limpias',
    'Arquitecturas Limpias',
    'HTML'
  ];

  constructor() { }

  ngOnInit(): void {
    this.loading = false;
  }

  ngOnDestroy(): void {
    this.loading = true;
  }

  exportToExcel(): void {
    /* Pasar el id de la tabla */
    let element: any = document.getElementById('excel-table');
    let spans: any = document.querySelectorAll('#excel-table span');
    spans.forEach((span: any) => span.remove());
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

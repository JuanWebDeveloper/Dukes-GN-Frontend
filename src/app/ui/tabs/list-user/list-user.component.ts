import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
// @ts-ignore
import * as XLSX from 'xlsx';

import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/models/User';

/* Importaciones para hacer uso del paquete que permite crear y exportar PDFs */
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
const htmlToPdfmake = require('html-to-pdfmake');
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'dukes-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss'],
})
export class ListUserComponent implements OnInit, OnDestroy {
  public users: User[] | undefined;
  public loading: boolean = true;
  public fileName = 'DukesGN-ListadoUsuarios.xlsx';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((users: User[]) => {
      this.users = users;
      this.loading = false;
    });
  }

  ngOnDestroy(): void {
    this.users = undefined;
    this.loading = true;
  }

  public showIcon(state: boolean) {
    return state ? 'fas fa-check-circle check' : 'fas fa-times-circle times';
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

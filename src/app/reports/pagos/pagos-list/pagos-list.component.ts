import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GroupingState, PaginatorState, SortState } from 'src/app/utils/crud-table';
import { PagosService } from '../services/pagos.service';
import { Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import { MatSelectChange } from '@angular/material/select';
import { ReservasService } from '../../reservas/services/reservas.service';
import { PdfMakeWrapper, QR, Table, Txt, Img  } from 'pdfmake-wrapper';

@Component({
  selector: 'app-pagos-list',
  templateUrl: './pagos-list.component.html',
  styleUrls: ['./pagos-list.component.css']
})
export class PagosListComponent implements OnInit {


  paginator!: PaginatorState;
  sorting?: SortState;
  grouping?: GroupingState;
  isLoading?: boolean;
  private subscriptions: Subscription[] = [];
  filterGroup: any;
  searchGroup: any;
  public variables: any[] = [];
  public filteredList5: any[] = [];


  constructor(public pagosService: PagosService,
    public reservasService: ReservasService,
    private modalService: NgbModal,
    private router: Router,
    private fb: FormBuilder) 
    { }

  ngOnInit(): void {
    this.obetenerCLientes();
    this.filterForm();
    this.searchForm();

    this.grouping = this.pagosService.grouping;
    this.paginator = this.pagosService.paginator;
    this.sorting = this.pagosService.sorting;
    this.pagosService.fetch();
  }

  filterForm() {
    this.filterGroup = this.fb.group({
      startDate: [''],
      endDate: [''],
      searchTerm: [''],
      status: [''],
      sucursal: [''],
      ordering: ['desc']
    });
  }

  filter() {
    this.pagosService.patchState(
      {
        // status: this.filterGroup.get('status').value,
        // sucursal: this.filterGroup.get('sucursal').value,
        startDate: this.formatDate(this.filterGroup.get('startDate').value),
        endDate: this.formatDate(this.filterGroup.get('endDate').value),
        // searchTerm: this.searchGroup.get('searchTerm').value,
        
      });
  }

  formatDate(date: Date): string {
    if (date) {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return `${year}-${month}-${day}`;
    } else {
      return "";
    }
  }


  paginate(paginator: PaginatorState) {
    this.pagosService.patchState({ paginator });
  }

  onSelectChange(event: MatSelectChange): void {
    this.paginator.pageSize =  event.value;
    this.pagosService.fetch();
  }

  searchForm() {
    this.searchGroup = this.fb.group({
      searchTerm: [''],
    });
    const searchEvent = this.searchGroup.controls.searchTerm.valueChanges
      .pipe(
        debounceTime(150),
        distinctUntilChanged()
      )
      .subscribe((val: any) => this.search(val));
    this.subscriptions.push(searchEvent);
  }

  search(searchTerm: string) {
    this.pagosService.patchState({ searchTerm });
  }




  exportFile(){
    // const params = {
    //   status: this.filterGroup.get('status').value,
    //   startDate: this.formatDate(this.filterGroup.get('startDate').value),
    //   endDate: this.formatDate(this.filterGroup.get('endDate').value),
    //   searchTerm: this.searchGroup.get('searchTerm').value,
    // };
    this.pagosService.exportFile().subscribe(
      (response: Blob) => {
        const url = window.URL.createObjectURL(response);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'pagos.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error => {
        console.error('Error al exportar reservas a Excel:', error);
      }
    );
  }


  obetenerCLientes(){
    this.reservasService.getClientes().subscribe(resp => {
      this.variables = resp.data;
      this.filteredList5 = this.variables.slice();
    })
  }


  onSelectionChange(event: any) {
    this.searchGroup.controls.searchTerm.setValue(event.value.codCliente); 
  }

  resetTable(){
    this.searchGroup.controls.searchTerm.setValue(''); 
  }


  async print(data?: any) {
    
   

    var titulo = 'RESERVAS DEPORTIVAS EL CHATO';
    var espacio = '   ';

    // var filename = "dddf";

    const pdf = new PdfMakeWrapper();
    pdf.pageSize('A7');
    pdf.pageMargins([ 8, 8, 10, 10 ]);
    pdf.info({
      title: 'Qhatu APP - Reporte',
      author: 'AmazonasTradingSAC',
      subject: 'subject of document',
    });

    pdf.defaultStyle({
      fontSize: 7
    });





    pdf.add( new Txt(titulo).alignment('center').bold().italics().end);
    pdf.add( new Txt('RUC. 123456789 ').alignment('center').italics().end);
    pdf.add( new Txt('Direccion de la empresa - Perú').alignment('center').italics().end);
    pdf.add( new Txt('---------------------------------------------------------------------------------------------------').alignment('center').italics().end);
    pdf.add( new Txt('Nº de PAGO ' + data.idPago).alignment('center').italics().end);
    pdf.add( new Txt('---------------------------------------------------------------------------------------------------').alignment('center').italics().end);
    pdf.add( new Txt('FECHA: ' + data.fechRegistro.substr(0,10)).alignment('left').italics().end);
    pdf.add( new Txt('CLIENTE: ' + data.nombreCliente).alignment('left').italics().end);
    pdf.add( new Txt('DNI: ' + data.numDocumento).alignment('left').italics().end);
    pdf.add( new Txt('---------------------------------------------------------------------------------------------------').alignment('center').italics().end);
    pdf.add (new Table([
      [ 
        'HORA INICIO: ' + data.horainicio,
        'HORA FIN: ' + data.horafinal
      ],
      [ 
        'PAGO: S/ ' + data.importePago,
        'METODO: ' +data.metodoPago,
      ],
      [ 
        'CAMPO: ' + data.nombreLocalidad,
        'DURACION: ' +data.duracion + ' mints',
      ],
  ]).alignment('left').italics().layout('noBorders').widths([ 100,100  ]).end);
  pdf.add( new Txt('---------------------------------------------------------------------------------------------------').alignment('center').italics().end);
  pdf.add( new Txt(espacio).end);
  pdf.add(new QR(data.idPago+'0000').fit(60).alignment('center').end);

  pdf.add( new Txt(espacio).end);
  pdf.add( new Txt('MUCHAS GRACIAS POR SU PREFERENCIA').alignment('center').bold().italics().end);
  pdf.add( new Txt('www.reservaselchato.site').alignment('center').italics().end);
  pdf.add( new Txt(espacio).end);
  pdf.add( new Txt('FECHA DE IMPRESIÓN' ).alignment('left').italics().end);
  pdf.add( new Date().toLocaleString());
  pdf.add( new Txt(espacio).end);
    



    pdf.create().download();

    return true;
  }


}

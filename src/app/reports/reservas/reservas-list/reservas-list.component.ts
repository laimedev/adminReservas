import { Component, OnInit } from '@angular/core';
import { Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import { GroupingState, PaginatorState, SortState } from 'src/app/utils/crud-table';
import { ReservasService } from '../services/reservas.service';
import { MatSelectChange } from '@angular/material/select';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteReservaComponent } from '../modal/delete-reserva/delete-reserva.component';
import { PayRservaComponent } from '../modal/pay-rserva/pay-rserva.component';
import { SnackbarHelper } from 'src/app/utils/helpers/snackbar-helper';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CamposService } from 'src/app/settings/campos/services/campos.service';

@Component({
  selector: 'app-reservas-list',
  templateUrl: './reservas-list.component.html',
  styleUrls: ['./reservas-list.component.css']
})
export class ReservasListComponent implements OnInit {

  idClientePublic: number = 0;


  paginator!: PaginatorState;
  sorting?: SortState;
  grouping?: GroupingState;
  isLoading?: boolean;
  private subscriptions: Subscription[] = [];
  filterGroup: any;
  searchGroup: any;

  public variables: any[] = [];
  public filteredList5: any[] = [];

  public localidades: any = [];

  constructor(public reservasService: ReservasService,
    public campoService: CamposService,
    private modalService: NgbModal,
    private router: Router,
    private snackBar: MatSnackBar,
    private fb: FormBuilder) 
    { }

  ngOnInit(): void {
    this.obetenerCLientes();
    this.listCmapos();
    this.filterForm();
    this.searchForm();

    this.grouping = this.reservasService.grouping;
    this.paginator = this.reservasService.paginator;
    this.sorting = this.reservasService.sorting;
    this.reservasService.fetch();

  }


  listCmapos(){
    this.campoService.getLocalidadesAll().subscribe( resp => {
      console.log(resp);
      this.localidades = resp.data;
    })
  }

  resetTable(){
    this.searchGroup.controls.searchTerm.setValue(''); 
  }

  filterForm() {
    this.filterGroup = this.fb.group({
      startDate: [''],
      endDate: [''],
      searchTerm: [''],
      status: [''],
      venta_id: [''],
      sucursal: [''],
      ordering: ['desc']
    });
  }


  filter() {
    this.reservasService.patchState(
      {
        status: this.filterGroup.get('status').value,
        venta_id: this.filterGroup.get('venta_id').value,
        sucursal: this.filterGroup.get('sucursal').value,
        startDate: this.formatDate(this.filterGroup.get('startDate').value),
        endDate: this.formatDate(this.filterGroup.get('endDate').value),
        // searchTerm: this.searchGroup.get('searchTerm').value,
        
      });

      const data = {
        "page": 1,
        "pageSize": 10,
        "pageSizes": []
    }
      this.paginate(data);
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

  paginate(paginator: any) {
  // paginate(paginator: PaginatorState) {
    this.reservasService.patchState({ paginator });
    console.log(paginator)
  }

  onSelectChange(event: MatSelectChange): void {
    this.paginator.pageSize =  event.value;
    this.reservasService.fetch();
  }



  obetenerCLientes(){
    this.reservasService.getClientes().subscribe(resp => {
      this.variables = resp.data;
      this.filteredList5 = this.variables.slice();
    })
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
    this.reservasService.patchState({ searchTerm });
  }


  onSelectionChange(event: any) {
    this.searchGroup.controls.searchTerm.setValue(event.value.codCliente); 
  }


  goReserve() {
    this.router.navigateByUrl('/admin');
  }




 openDelete(data?: any){
  const deleteModal = this.modalService.open(DeleteReservaComponent, { size: 'lg', backdrop: 'static', centered: true })
  deleteModal.componentInstance.empleado = data
  deleteModal.result.then(res => {
    // this.cargarEmpleado();
    this.reservasService.fetch();

  })
 }



 openPayReserva(data?: any){
  const deleteModal = this.modalService.open(PayRservaComponent, { size: 'lg', backdrop: 'static', centered: true })
  deleteModal.componentInstance.empleado = data
  deleteModal.result.then(res => {
    // this.cargarEmpleado();
    this.reservasService.fetch();

  })
 }




 exportFile() {
  const startDate = this.filterGroup.get('startDate').value;
  const endDate = this.filterGroup.get('endDate').value;

  if (!startDate || !endDate) {
    SnackbarHelper.show(this.snackBar, { 
      msg: 'Fecha inicio y Fecha final no están definidos', 
      panelClass: ['custom-snackbar']
    });
  } else {
    const params = {
      status: this.filterGroup.get('status').value,
      venta_id: this.filterGroup.get('venta_id').value,
      startDate: this.formatDate(startDate),
      endDate: this.formatDate(endDate),
      searchTerm: this.searchGroup.get('searchTerm').value,
    };

    // console.log(params);

    this.reservasService.exportFile(params).subscribe(
      (response: Blob) => {
        const url = window.URL.createObjectURL(response);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'reservas.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error => {
        console.error('Error al exportar reservas a Excel:', error);
      }
    );

    
  }
}



 
  copyIDVenta(data: any){
    if(data.venta_id){
      navigator.clipboard.writeText(data.venta_id).then(() => {
        SnackbarHelper.show(this.snackBar, { msg: 'COPIADO: ID de venta: ' + data.venta_id,  })
      }).catch(err => {
        console.error('Failed to copy: ', err);
      });
    }
  }


  pasteCODRegistro() {
    navigator.clipboard.readText().then((textFromClipboard) => {
      // Aquí puedes usar el texto obtenido desde el portapapeles (textFromClipboard)
      console.log('Texto pegado desde el portapapeles:', textFromClipboard);
      this.filterGroup.get('venta_id')?.setValue(textFromClipboard)
      SnackbarHelper.show(this.snackBar, { msg: 'Pegar de portapapeles: ' + textFromClipboard,  })

      // Ejemplo: asignar el texto a una propiedad o mostrarlo en un Snackbar
      // this.data.codRegistro = textFromClipboard;
      SnackbarHelper.show(this.snackBar, { msg: 'Texto pegado desde el portapapeles: ' + textFromClipboard });
    }).catch(err => {
      console.error('Failed to paste: ', err);
      SnackbarHelper.show(this.snackBar, { msg: 'Error al pegar desde el portapapeles', duration: 3000 });
    });
  }



}

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

  

  constructor(public reservasService: ReservasService,
    private modalService: NgbModal,
    private router: Router,
    private snackBar: MatSnackBar,
    private fb: FormBuilder) 
    { }

  ngOnInit(): void {
    this.obetenerCLientes();
    this.filterForm();
    this.searchForm();

    this.grouping = this.reservasService.grouping;
    this.paginator = this.reservasService.paginator;
    this.sorting = this.reservasService.sorting;
    this.reservasService.fetch();

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




  exportFile(){
    // const params = {
    //   status: this.filterGroup.get('status').value,
    //   startDate: this.formatDate(this.filterGroup.get('startDate').value),
    //   endDate: this.formatDate(this.filterGroup.get('endDate').value),
    //   searchTerm: this.searchGroup.get('searchTerm').value,
    // };
    this.reservasService.exportFile().subscribe(
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


 
  copyIDVenta(data: any){
    if(data.venta_id){
      navigator.clipboard.writeText(data.venta_id).then(() => {
        SnackbarHelper.show(this.snackBar, { msg: 'COPIADO: ID de venta: ' + data.venta_id,  })
      }).catch(err => {
        console.error('Failed to copy: ', err);
      });
    }
  }



}

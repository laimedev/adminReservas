import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GroupingState, PaginatorState, SortState } from 'src/app/utils/crud-table';
import { MatSelectChange } from '@angular/material/select';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { SucursalesService } from '../services/sucursales.service';
import { CreateSucursalComponent } from '../modal/create-sucursal/create-sucursal.component';
import { Sucursal } from 'src/app/entities/modulos/sucursal';
import { DeleteSucursalComponent } from '../modal/delete-sucursal/delete-sucursal.component';
import { EditSucursalComponent } from '../modal/edit-sucursal/edit-sucursal.component';
import { ChangeStatusComponent } from '../modal/change-status/change-status.component';


@Component({
  selector: 'app-sucursales-list',
  templateUrl: './sucursales-list.component.html',
  styleUrls: ['./sucursales-list.component.css']
})
export class SucursalesListComponent implements OnInit {

  public data: any = [];


  public empleado: any[] = [];
  public empleadoTemp: any[] = [];
  
  public cargando: boolean = true;
  public desde: number = 0;
  public formSubmited = false;
  public totalEmpleado: number = 0;
  searchGroup: any;
  filterGroup: any;



  paginator!: PaginatorState;
  sorting?: SortState;
  grouping?: GroupingState;
  isLoading?: boolean;
  private subscriptions: Subscription[] = [];

  constructor(public empleadoService: SucursalesService,
    private fb: FormBuilder,
    private modalService: NgbModal) { }

  ngOnInit(): void {

    this.filterForm();
    this.searchForm();

    this.grouping = this.empleadoService.grouping;
    this.paginator = this.empleadoService.paginator;
    this.sorting = this.empleadoService.sorting;
    this.empleadoService.fetch();
  }


  paginate(paginator: PaginatorState) {
    this.empleadoService.patchState({ paginator });
  }

  onSelectChange(event: MatSelectChange): void {
    this.paginator.pageSize =  event.value;
    this.empleadoService.fetch();
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
    this.empleadoService.patchState({ searchTerm });
  }

  filter() {
    this.empleadoService.patchState(
      {
        status: this.filterGroup.get('status').value,
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

  

  filterForm() {
    this.filterGroup = this.fb.group({
      startDate: [''],
      endDate: [''],
      searchTerm: [''],
      status: [''],
      ordering: ['desc']
    });
  }



  openCreate(){
    const modalRef = this.modalService.open(CreateSucursalComponent, { size: 'lg', backdrop: 'static', centered: true });
      modalRef.result.then(res => {
        this.empleadoService.fetch();
      })
  }
  
  openChangeStatus(data: Sucursal){
    const modalEdit = this.modalService.open(ChangeStatusComponent, { size: 'lg', backdrop: 'static', centered: true })
    modalEdit.componentInstance.empleado = data
    modalEdit.result.then(res => {
      this.empleadoService.fetch();
    })
  }

  openEdit(data: Sucursal) {
    const modalEdit = this.modalService.open(EditSucursalComponent, { size: 'lg', backdrop: 'static', centered: true })
    modalEdit.componentInstance.empleado = data
    modalEdit.result.then(res => {
      this.empleadoService.fetch();
    })
  }
  openDelete(data: Sucursal) {
    const deleteModal = this.modalService.open(DeleteSucursalComponent, { size: 'lg', backdrop: 'static', centered: true })
    deleteModal.componentInstance.empleado = data
    deleteModal.result.then(res => {
      // this.cargarEmpleado();
      this.empleadoService.fetch();

    })
  }




  exportFile(){
    // const params = {
    //   status: this.filterGroup.get('status').value,
    //   startDate: this.formatDate(this.filterGroup.get('startDate').value),
    //   endDate: this.formatDate(this.filterGroup.get('endDate').value),
    //   searchTerm: this.searchGroup.get('searchTerm').value,
    // };
    this.empleadoService.exportFile().subscribe(
      (response: Blob) => {
        const url = window.URL.createObjectURL(response);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'sucursales.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error => {
        console.error('Error al exportar usuarios a Excel:', error);
      }
    );
  }



 

}

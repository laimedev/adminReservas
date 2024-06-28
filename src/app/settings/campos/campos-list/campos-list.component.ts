import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GroupingState, PaginatorState, SortState } from 'src/app/utils/crud-table';
import { MatSelectChange } from '@angular/material/select';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { CamposService } from '../services/campos.service';
import { CreateCamposComponent } from '../modal/create-campos/create-campos.component';
import { ChangeStatusComponent } from '../modal/change-status/change-status.component';
import { EditCamposComponent } from '../modal/edit-campos/edit-campos.component';
import { DeleteCamposComponent } from '../modal/delete-campos/delete-campos.component';
import { Campo } from 'src/app/entities/modulos/campos';

@Component({
  selector: 'app-campos-list',
  templateUrl: './campos-list.component.html',
  styleUrls: ['./campos-list.component.css']
})
export class CamposListComponent implements OnInit {

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

  constructor(public empleadoService: CamposService,
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
        sucursal: this.filterGroup.get('sucursal').value,
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
      sucursal: [''],
      ordering: ['desc']
    });
  }



  openCreate(){
    const modalRef = this.modalService.open(CreateCamposComponent, { size: 'lg', backdrop: 'static', centered: true });
      modalRef.result.then(res => {
        this.empleadoService.fetch();
      })
  }
  
  openChangeStatus(data: Campo){
    const modalEdit = this.modalService.open(ChangeStatusComponent, { size: 'lg', backdrop: 'static', centered: true })
    modalEdit.componentInstance.empleado = data
    modalEdit.result.then(res => {
      this.empleadoService.fetch();
    })
  }

  openEdit(data: Campo) {
    const modalEdit = this.modalService.open(EditCamposComponent, { size: 'lg', backdrop: 'static', centered: true })
    modalEdit.componentInstance.empleado = data
    modalEdit.result.then(res => {
      this.empleadoService.fetch();
    })
  }
  openDelete(data: Campo) {
    const deleteModal = this.modalService.open(DeleteCamposComponent, { size: 'lg', backdrop: 'static', centered: true })
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
        a.download = 'campos.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error => {
        console.error('Error al exportar campos a Excel:', error);
      }
    );
  }



 

}

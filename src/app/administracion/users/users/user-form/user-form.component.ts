import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmpleadoService } from '../services/empleado.service';
import { Usuario } from 'src/app/entities/modulos/usuario';



@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {


  @Input() formGroup!: FormGroup;
  @Output() submitEvent = new EventEmitter<Usuario>()
  @Output() closeEvent =  new EventEmitter<boolean>()
  @Input() disableControl?: boolean
  @Input() formTitle?: string
  refreshTable = false
  statusActive: boolean = false;

  viewPassword: boolean = false;


  tipo = [
    {value: 'ADMINISTRADOR', label: 'ADMINISTRADOR'},
    {value: 'PERSONAL', label: 'PERSONAL'}
  ]


  constructor(protected fb: FormBuilder,
    protected activeModal: NgbActiveModal,
    private modalService: NgbModal,
    public empleadoService: EmpleadoService,
    private dateAdapter: DateAdapter<Date>) {
      
      this.dateAdapter.setLocale('en-GB'); 

    }

  ngOnInit(): void {

    this.formGroup.reset();
    if(this.formTitle === 'EDITAR USUARIO'){
      this.statusActive = false;
      this.viewPassword = false;
    } else{
      this.statusActive = true;
      this.viewPassword = true;
    }
  }


  onSubmit() {
    // const date = new Date(Date.parse(this.formGroup.get('fecha_nacimiento').value))
    // this.formGroup.get('fecha_nacimiento')?.setValue(date);
    console.log(this.formGroup.value);
      this.submitEvent.emit(this.formGroup.value)
      this.formGroup.reset();
  }


  closeMOdal() {
    this.closeEvent.emit(this.refreshTable)
    this.modalService.dismissAll();
  }

}

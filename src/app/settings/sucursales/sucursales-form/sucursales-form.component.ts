import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Sucursal } from 'src/app/entities/modulos/sucursal';
import { SucursalesService } from '../services/sucursales.service';

@Component({
  selector: 'app-sucursales-form',
  templateUrl: './sucursales-form.component.html',
  styleUrls: ['./sucursales-form.component.css']
})
export class SucursalesFormComponent implements OnInit {

  @Input() formGroup!: FormGroup;
  @Output() submitEvent = new EventEmitter<Sucursal>()
  @Output() closeEvent =  new EventEmitter<boolean>()
  @Input() disableControl?: boolean
  @Input() formTitle?: string
  refreshTable = false
  statusActive: boolean = false;

  viewPassword: boolean = false;


  tipo = [
    {value: 'CLIENTE', label: 'CLIENTE'},
    {value: 'VECINO_SURCANO', label: 'VECINO_SURCANO'}
  ]

  genero = [
    {value: 'M', label: 'MASCULINO'},
    {value: 'F', label: 'FEMENINO'}
  ]


  tipo_documento = [
    {value: 'DNI', label: 'DNI'},
    {value: 'Nie', label: 'Nie'},
    {value: 'Pasaporte', label: 'Pasaporte'},
    {value: 'Carnet de extranjería', label: 'Carnet de extranjería'},
    {value: 'Licencia', label: 'Licencia'},
  ]

  constructor(protected fb: FormBuilder,
    protected activeModal: NgbActiveModal,
    private modalService: NgbModal,
    public empleadoService: SucursalesService,
    private dateAdapter: DateAdapter<Date>) {
      
      this.dateAdapter.setLocale('en-GB'); 

    }

  ngOnInit(): void {

    this.formGroup.reset();
    if(this.formTitle === 'EDITAR SUCURSAL'){
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
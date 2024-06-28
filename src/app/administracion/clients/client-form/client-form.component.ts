import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Cliente } from 'src/app/entities/modulos/cliente';
import { ClientService } from '../services/client.service';


@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent implements OnInit {

  @Input() formGroup!: FormGroup;
  @Output() submitEvent = new EventEmitter<Cliente>()
  @Output() closeEvent =  new EventEmitter<boolean>()
  @Input() disableControl?: boolean
  @Input() formTitle?: string
  refreshTable = false
  statusActive: boolean = false;

  viewPassword: boolean = false;


  tipo = [
    {value: 'CLIENTE', label: 'CLIENTE'},
    {value: 'MENOR', label: 'Menores'},
    {value: 'MAYOR', label: 'Aulto Mayor'},
    {value: 'VECINO_SI', label: 'Vecinos San Ignacio'},
    {value: 'VECINO_VSP', label: 'Vecinos VSP'}
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
    public empleadoService: ClientService,
    private dateAdapter: DateAdapter<Date>) {
      
      this.dateAdapter.setLocale('en-GB'); 

    }

  ngOnInit(): void {

    this.formGroup.reset();
    if(this.formTitle === 'EDITAR CLIENTE'){
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
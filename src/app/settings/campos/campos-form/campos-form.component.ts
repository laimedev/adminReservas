import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Campo } from 'src/app/entities/modulos/campos';
import { CamposService } from '../services/campos.service';
import { ReserveService } from 'src/app/home/services/reserve.service';

@Component({
  selector: 'app-campos-form',
  templateUrl: './campos-form.component.html',
  styleUrls: ['./campos-form.component.css']
})
export class CamposFormComponent implements OnInit {

  @Input() formGroup!: FormGroup;
  @Output() submitEvent = new EventEmitter<Campo>()
  @Output() closeEvent =  new EventEmitter<boolean>()
  @Input() disableControl?: boolean
  @Input() formTitle?: string
  refreshTable = false
  statusActive: boolean = false;

  public sucursal: any = [];


  constructor(protected fb: FormBuilder,
    protected activeModal: NgbActiveModal,
    private modalService: NgbModal,
    public reserveServices: ReserveService,
    public empleadoService: CamposService,
    private dateAdapter: DateAdapter<Date>) {
      
      this.dateAdapter.setLocale('en-GB'); 

    }

  ngOnInit(): void {
    this.formGroup.reset();
    if(this.formTitle === 'EDITAR CAMPO'){
      this.statusActive = false;
    } else{
      this.statusActive = true;
    }
  }


  onSubmit() {
    console.log(this.formGroup.value);
      this.submitEvent.emit(this.formGroup.value)
      this.formGroup.reset();
  }


  closeMOdal() {
    this.closeEvent.emit(this.refreshTable)
    this.modalService.dismissAll();
  }


  

}
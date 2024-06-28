import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ReservasService } from '../../services/reservas.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackbarHelper } from 'src/app/utils/helpers/snackbar-helper';

@Component({
  selector: 'app-pay-rserva',
  templateUrl: './pay-rserva.component.html',
  styleUrls: ['./pay-rserva.component.css']
})
export class PayRservaComponent implements OnInit {

  @Input() empleado!: any
  deleted = false
  deleting = false


  method = [
    {value: 'EFECTIVO', label: 'EFECTIVO'},
    {value: 'POS', label: 'POS'},
    {value: 'TRANSFERENCIA', label: 'TRANSFERENCIA'},
    {value: 'PASARELA DE PAGO', label: 'PASARELA DE PAGO'},
    {value: 'YAPE / PLIN', label: 'YAPE / PLIN'}
  ]


  formGroup: FormGroup;
 

  
  constructor(protected activeModal: NgbActiveModal,
    protected empleadoService: ReservasService,
    protected fb: FormBuilder,
    private snackBar: MatSnackBar) { 

      this.formGroup = this.fb.group({
        fechaPago: [new Date(), [Validators.required]],
        metodoPago: [null, [Validators.required]],
        importePago: ['', [Validators.required]],
        codRegistro: ['', [Validators.required]],
      })  


    }

    

  ngOnInit(): void {
    console.log('DATAAA: ', this.empleado);
  }

  closeModal() {
    this.activeModal.close(true)
  }


  delete(){
    if (this.formGroup.controls['metodoPago']?.value === null ) {
      SnackbarHelper.error(this.snackBar, { msg: 'Por favor, complete todos los campos.'});
    } else {
        this.deleting=true
        this.formGroup.controls['importePago']?.setValue(this.empleado.costoTarifa)
        this.formGroup.controls['codRegistro']?.setValue(this.empleado.codRegistro)
        this.empleadoService.createPayment(this.formGroup.value).subscribe( (resp: any) => {
          SnackbarHelper.show(this.snackBar, { msg: resp.message, });
        });
        this.empleadoService.updateStatus(this.empleado.codRegistro).subscribe((resp: any) => {
          SnackbarHelper.show(this.snackBar, { msg: resp.message, });
          this.deleted = true
          this.deleting=false
          this.closeModal()
        })
    }
  }


  
onSelectionChange(event: any) {
  this.formGroup.controls['metodoPago']?.setValue(event.value)
}

}

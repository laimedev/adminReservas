import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarHelper } from 'src/app/utils/helpers/snackbar-helper';
import { SucursalesService } from '../../services/sucursales.service';

@Component({
  selector: 'app-create-sucursal',
  templateUrl: './create-sucursal.component.html',
  styleUrls: ['./create-sucursal.component.css']
})
export class CreateSucursalComponent implements OnInit {

  formGroup: FormGroup;
  disableControl = false;

  constructor(protected formService: SucursalesService, 
    protected activeModal: NgbActiveModal,
    private snackBar: MatSnackBar) {
      this.formGroup = formService.form;
     }

  ngOnInit(): void {
  }

  onClose($res: boolean) {
    this.activeModal.close($res)
  }


  onSubmit(value: any) {
    this.disableForm()
    this.formService.create2(value).subscribe(data => {
      this.enableForm()
      SnackbarHelper.show(this.snackBar, { msg: 'Se creó con éxito', })
      this.activeModal.close(true)
    }, (error) => {
      this.enableForm()
    })
  }

  disableForm(): void {
    this.disableControl = true
    this.formGroup.disable()
  }

  enableForm() {
    this.disableControl = false
      this.formGroup.enable()
  }

}

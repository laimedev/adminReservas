import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SnackbarHelper } from 'src/app/utils/helpers/snackbar-helper';
import { EmpleadoService } from '../../services/empleado.service';
import { Usuario } from 'src/app/entities/modulos/usuario';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {


  formGroup: any;
  formLoaded = false
  disableControl = false;
  serverResponseJSON: any
  @Input() empleado!: Usuario

  constructor(
    protected formService: EmpleadoService,
    protected activeModal: NgbActiveModal,
    private snackBar: MatSnackBar) {
      
  }

  ngOnInit(): void {
    this.formService.getById(this.empleado).subscribe((data: any) => {
      console.log(data)
      console.log("cargo editar")
      this.formService.fillForm = data
      // this.formLoaded = true
    })
    this.formGroup = this.formService.form;
  }



  onSubmit(value: any) {
    this.disableForm()
    this.formService.edit(this.empleado, value).subscribe(data => {
      SnackbarHelper.show(this.snackBar, { msg: 'Editó con éxito', })
      this.enableForm()
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


  onClose($res: any) {
    this.activeModal.close($res)
  }



}

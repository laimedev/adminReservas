import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Campo } from 'src/app/entities/modulos/campos';
import { SnackbarHelper } from 'src/app/utils/helpers/snackbar-helper';
import { CamposService } from '../../services/campos.service';

@Component({
  selector: 'app-delete-campos',
  templateUrl: './delete-campos.component.html',
  styleUrls: ['./delete-campos.component.css']
})
export class DeleteCamposComponent implements OnInit {

  @Input() empleado!: Campo
  deleted = false
  deleting = false

  constructor(protected activeModal: NgbActiveModal,
    protected empleadoService: CamposService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }


  closeModal() {
    this.activeModal.close(true)
  }

  delete() {
    this.deleting=true
    this.empleadoService.delete2(this.empleado).subscribe(data => {
      SnackbarHelper.show(this.snackBar, { msg: 'Eliminado con éxito', })
      console.log(data);
      this.deleted = true
      this.deleting=false
      this.closeModal()
    })  
  }


}
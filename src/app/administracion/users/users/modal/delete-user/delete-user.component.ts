import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SnackbarHelper } from 'src/app/utils/helpers/snackbar-helper';
import { EmpleadoService } from '../../services/empleado.service';
import { Usuario } from 'src/app/entities/modulos/usuario';


@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent implements OnInit {

  @Input() empleado!: Usuario
  deleted = false
  deleting = false

  constructor(protected activeModal: NgbActiveModal,
    protected empleadoService: EmpleadoService,
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

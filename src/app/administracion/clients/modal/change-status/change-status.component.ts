import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Usuario } from 'src/app/entities/modulos/usuario';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarHelper } from 'src/app/utils/helpers/snackbar-helper';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-change-status',
  templateUrl: './change-status.component.html',
  styleUrls: ['./change-status.component.css']
})
export class ChangeStatusComponent implements OnInit {

  @Input() empleado!: Usuario
  deleted = false
  deleting = false
  public statusUser: any = '';

  constructor(protected activeModal: NgbActiveModal,
    protected empleadoService: ClientService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    if(this.empleado.estado === 'ACTIVO') {
      this.statusUser = 'INACTIVO';
    } else if(this.empleado.estado === 'INACTIVO') {
      this.statusUser = 'ACTIVO'
    }
  }


  closeModal() {
    this.activeModal.close(true)
  }

  delete() {
    this.deleting=true
    this.empleadoService.changeStatus(this.empleado, {estado: this.statusUser}).subscribe(data => {
      SnackbarHelper.show(this.snackBar, { msg: 'Estado cambiado con éxito', })
      console.log(data);
      this.deleted = true
      this.deleting=false
      this.closeModal()
    })  
  }

}

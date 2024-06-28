import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SnackbarHelper } from 'src/app/utils/helpers/snackbar-helper';
import { Sucursal } from 'src/app/entities/modulos/sucursal';
import { SucursalesService } from '../../services/sucursales.service';

@Component({
  selector: 'app-delete-sucursal',
  templateUrl: './delete-sucursal.component.html',
  styleUrls: ['./delete-sucursal.component.css']
})
export class DeleteSucursalComponent implements OnInit {

  @Input() empleado!: Sucursal
  deleted = false
  deleting = false

  constructor(protected activeModal: NgbActiveModal,
    protected empleadoService: SucursalesService,
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
import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SnackbarHelper } from 'src/app/utils/helpers/snackbar-helper';
import { ReservasService } from '../../services/reservas.service';


@Component({
  selector: 'app-delete-reserva',
  templateUrl: './delete-reserva.component.html',
  styleUrls: ['./delete-reserva.component.css']
})
export class DeleteReservaComponent implements OnInit {

  @Input() empleado!: any
  deleted = false
  deleting = false

  matchKey = true

  constructor(protected activeModal: NgbActiveModal,
    protected empleadoService: ReservasService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }


  closeModal() {
    this.activeModal.close(true)
  }

  delete() {
    this.deleting=true
    this.empleadoService.deleteByVentaId(this.empleado).subscribe(data => {
      SnackbarHelper.show(this.snackBar, { msg: 'Eliminado con éxito', })
      console.log(data);
      this.deleted = true
      this.deleting=false
      this.closeModal()
    })  
  }

  detectar(event: any){
    if(event.value == this.empleado.codRegistro) {
      this.matchKey = false;
    } else {
      this.matchKey = true;
    }
  }


}

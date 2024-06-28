import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SnackbarHelper } from 'src/app/utils/helpers/snackbar-helper';

@Component({
  selector: 'app-reserva-edit',
  templateUrl: './reserva-edit.component.html',
  styleUrls: ['./reserva-edit.component.css']
})
export class ReservaEditComponent implements OnInit {


  deleted = false
  deleting = false

  @Input() data!: any


  times = [
    {
      time: '50',
      label: '1 Hora'
    },
    {
      time: '110',
      label: '2 Horas'
    },
    {
      time: '160',
      label: '3 Horas'
    }
  ]


  constructor(protected activeModal: NgbActiveModal,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    console.log(this.data)
  }


  closeModal() {
    this.activeModal.close(true)
  }


  delete() {

  }



  copyIDVenta(){
    navigator.clipboard.writeText(this.data.venta_id).then(() => {
      SnackbarHelper.show(this.snackBar, { msg: 'ID de venta copiada', })
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  }


}

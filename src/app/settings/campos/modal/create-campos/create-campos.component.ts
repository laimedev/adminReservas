import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CamposService } from '../../services/campos.service';
import { SnackbarHelper } from 'src/app/utils/helpers/snackbar-helper';

@Component({
  selector: 'app-create-campos',
  templateUrl: './create-campos.component.html',
  styleUrls: ['./create-campos.component.css']
})
export class CreateCamposComponent implements OnInit {

  formGroup: FormGroup;
  disableControl = false;

  constructor(protected formService: CamposService, 
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

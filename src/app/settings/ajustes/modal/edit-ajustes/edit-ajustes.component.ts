import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AjustesService } from '../../services/ajustes.service';

interface HtmlInputEvent extends Event{
  target : HTMLInputElement & EventTarget;
} 

@Component({
  selector: 'app-edit-ajustes',
  templateUrl: './edit-ajustes.component.html',
  styleUrls: ['./edit-ajustes.component.css']
})
export class EditAjustesComponent implements OnInit {

  @Output() closeEvent =  new EventEmitter<boolean>()
  refreshTable = false
  @Input() disableControl?: boolean
  imgSelect: boolean = true;

  formGroup: any;
  urlImg: any = 'https://res.cloudinary.com/laimedev/image/upload/v1712382601/reservation/empresa/'
  data: any = [];
  public file? :File;

  constructor(protected fb: FormBuilder,
    protected activeModal: NgbActiveModal,
    public ajusteService: AjustesService,
    private modalService: NgbModal) { 

      

      this.formGroup = this.fb.group({
        nombre: ['', [Validators.required]],
        telefono: ['', [Validators.required]],
        direccion: ['', [Validators.required]],
        logo: [''],
      })     
      

      this.ajusteService.getById(1).subscribe( resp => {
        console.log(resp);
        this.data = resp;
        this.formGroup.controls['nombre']?.setValue(resp.nombre)
        this.formGroup.controls['telefono']?.setValue(resp.telefono)
        this.formGroup.controls['direccion']?.setValue(resp.direccion)
      })

    }

  ngOnInit(): void {
  }


  onSubmit() {
    this.ajusteService.edit(this.formGroup.value, 1).subscribe(data => {
      this.activeModal.close(true)
    })
  }


  imgSelected(event?: any){
    if(event.target.files  && event.target.files[0]){
        this.file = <File>event.target.files[0];

        const reader = new FileReader();
        reader.onload = e => this.data.logo= reader.result;
        this.imgSelect = false;
        reader.readAsDataURL(this.file);
       console.log(this.file);
       this.formGroup.controls.logo.setValue(this.file)
        
    }
    
  }



  closeMOdal() {
    this.closeEvent.emit(this.refreshTable)
    this.modalService.dismissAll();
  }

}

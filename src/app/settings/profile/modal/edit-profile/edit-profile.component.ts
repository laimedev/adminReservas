import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  @Output() closeEvent =  new EventEmitter<boolean>()
  refreshTable = false
  @Input() disableControl?: boolean
  imgSelect: boolean = true;

  formGroup: any;
  urlImg: any = 'https://res.cloudinary.com/laimedev/image/upload/v1712382601/reservation/admin/'
  data?: any = [];
  public file? :File;

  user: any;

  constructor(protected fb: FormBuilder,
    protected activeModal: NgbActiveModal,
    public ajusteService: ProfileService,
    private modalService: NgbModal) { 

      const dataUser = JSON.parse(localStorage.getItem('session')!)
      this.user = dataUser.codUsuario

      this.formGroup = this.fb.group({
        nombres: ['', [Validators.required]],
        telefono: ['', [Validators.required]],
        email: ['', [Validators.required]],
        numDocumento: ['', [Validators.required]],
        tipo: ['', [Validators.required]],
        direccion: [''],
        password: [''],
        passwordConfirmation: [''],
        foto: [''],
      })     
      

      this.ajusteService.getById(this.user).subscribe( resp => {
        console.log(resp);
        this.data = resp;
        this.formGroup.controls['nombres']?.setValue(resp.nombres)
        this.formGroup.controls['telefono']?.setValue(resp.telefono)
        this.formGroup.controls['direccion']?.setValue(resp.direccion)
        this.formGroup.controls['email']?.setValue(resp.email)
        this.formGroup.controls['numDocumento']?.setValue(resp.numDocumento)
        this.formGroup.controls['tipo']?.setValue(resp.tipo)
      })

    }

  ngOnInit(): void {
  }


  onSubmit() {
    this.ajusteService.edit(this.formGroup.value, this.user).subscribe(data => {
      this.activeModal.close(true)
    })
  }


  imgSelected(event?: any){
    if(event.target.files  && event.target.files[0]){
        this.file = <File>event.target.files[0];

        const reader = new FileReader();
        reader.onload = e => this.data.foto= reader.result;
        this.imgSelect = false;
        reader.readAsDataURL(this.file);
       console.log(this.file);
       this.formGroup.controls.foto.setValue(this.file)
        
    }
    
  }



  closeMOdal() {
    this.closeEvent.emit(this.refreshTable)
    this.modalService.dismissAll();
  }

}

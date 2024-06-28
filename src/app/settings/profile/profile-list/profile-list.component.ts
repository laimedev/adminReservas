import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditProfileComponent } from '../modal/edit-profile/edit-profile.component';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.css']
})
export class ProfileListComponent implements OnInit {

  data: any = [];
  urlImg: any = 'https://res.cloudinary.com/laimedev/image/upload/v1712382601/reservation/admin/'

  user: any;

  constructor(public ajusteService: ProfileService,
    private modalService: NgbModal) { 
      const dataUser = JSON.parse(localStorage.getItem('session')!)
      this.user = dataUser.codUsuario
    }

  ngOnInit(): void {
    this.ajusteService.getById(this.user).subscribe( resp => {
      console.log(resp);
      this.data = resp;
    })
  }


  openEdit(data?: any) {
    const modalEdit = this.modalService.open(EditProfileComponent, { size: 'lg', backdrop: 'static', centered: true })
    modalEdit.componentInstance.empleado = data
    modalEdit.result.then((res: any) => {
      this.ngOnInit();
    })
  }
}

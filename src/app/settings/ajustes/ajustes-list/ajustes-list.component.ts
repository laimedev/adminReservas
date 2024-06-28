import { Component, OnInit } from '@angular/core';
import { AjustesService } from '../services/ajustes.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditAjustesComponent } from '../modal/edit-ajustes/edit-ajustes.component';

@Component({
  selector: 'app-ajustes-list',
  templateUrl: './ajustes-list.component.html',
  styleUrls: ['./ajustes-list.component.css']
})
export class AjustesListComponent implements OnInit {
  
  data: any = [];
  urlImg: any = 'https://res.cloudinary.com/laimedev/image/upload/v1712382601/reservation/empresa/'

  constructor(public ajusteService: AjustesService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.ajusteService.getById(1).subscribe( resp => {
      console.log(resp);
      this.data = resp;
    })
  }


  openEdit(data?: any) {
    const modalEdit = this.modalService.open(EditAjustesComponent, { size: 'lg', backdrop: 'static', centered: true })
    modalEdit.componentInstance.empleado = data
    modalEdit.result.then((res: any) => {
      this.ngOnInit();
    })
  }

}

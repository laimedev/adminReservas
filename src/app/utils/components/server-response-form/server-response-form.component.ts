import { Component, OnInit, Input } from '@angular/core';

export type ResponseType = { ok: boolean, message: string | string[] }

@Component({
  selector: 'app-server-response-form',
  templateUrl: './server-response-form.component.html',
  styleUrls: ['./server-response-form.component.scss']
})
export class ServerResponseFormComponent implements OnInit {

  @Input() response: any

  classCss: string = 'alert alert-success'
  message: any | string[]

  constructor() { }

  ngOnInit(): void {

    if (this.response?.ok !== true)
      this.classCss = 'alert alert-danger'

    this.message = this.response?.message ?? []
//console.log(this.message);

    if (typeof this.message === "string")
      this.message = [this.message]
  }

}

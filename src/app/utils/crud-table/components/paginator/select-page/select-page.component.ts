import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageSizes, PaginatorState } from '../../../models/paginator.model';


@Component({
  selector: 'app-select-page',
  templateUrl: './select-page.component.html',
  styleUrls: ['./select-page.component.scss']
})
export class SelectPageComponent implements OnInit {
  @Input() paginator!: PaginatorState;
  @Input() isLoading: any;
  @Output() paginate: EventEmitter<PaginatorState> = new EventEmitter();
  pageSizes: number[] = PageSizes;
  constructor() {

  }

  ngOnInit(): void {
  }


  pageChange(num: number) {
    this.paginator.page = num;
    this.paginate.emit(this.paginator);
  }

  sizeChange() {
    this.paginator.pageSize = +this.paginator.pageSize;
    this.paginator.page = 1;
    this.paginate.emit(this.paginator);
  }
}

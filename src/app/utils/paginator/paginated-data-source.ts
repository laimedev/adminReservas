import { DataSource } from '@angular/cdk/table';
import { pluck, startWith, switchMap, share, finalize, tap, catchError, distinctUntilChanged } from 'rxjs/operators';
import { Subject, Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { Sorter, Page, PaginatedEndpoint, filterDescriptor, PageRequest } from './page-utils';

export class PaginatedDataSource<T> implements DataSource<T> {

  //sort: MatSort | null;

  private pageNumber = new Subject<number>();
  private sorter = new Subject<Sorter<T>>();
  private filter: BehaviorSubject<filterDescriptor[]>;
  protected loading = new BehaviorSubject<boolean>(false)
  public page$: Observable<Page<T>>;

  private _lastFilter!: PageRequest<T>

  get loading$() {
    /**
     * Hate ya
     */
    return this.loading.asObservable().pipe(distinctUntilChanged())
  }

  constructor(
    endpoint: PaginatedEndpoint<T>,
    initialSort: Sorter<T>,
    size = 5) {

    this.filter = new BehaviorSubject<filterDescriptor[]>([])

    const query$ = combineLatest([
      this.filter,
      this.sorter.pipe(startWith(initialSort)),
      // this.pageNumber.pipe(
      //   startWith(0))
    ]);

    this.page$ = query$.pipe(

      switchMap(([filter, sort]) => this.pageNumber.pipe(
        startWith(0),
        /** Loading indicator */
        tap(() => this.loading.next(true) ),
        /** I wanna be exported plz */
        tap(page => this._lastFilter = { page, sort, size, filter }),
        switchMap((page) => endpoint({ page, sort, size, filter }).pipe(
          /** Loading indicator */
          tap(() => { this.loading.next(false) }),
        ))
      )),
      share()
    )
  }

  sortByFromMatSort(event: any) {

    let dir = event.direction || 'desc'
    this.sortBy({ field: event.active, order: dir });
  }

  sortBy(sort: Sorter<T>): void {

    this.sorter.next(sort);
  }

  fetch(page: number): void {
    this.pageNumber.next(page);
  }

  filterInput(filter_: filterDescriptor[]): void {
    console.log(filter_);

    this.filter.next(filter_)
  }

  get lastFilter(): PageRequest<T> {
    return this._lastFilter
  }

  updateTable(p: number) {
    this.pageNumber.next(p)
  }

  connect(): Observable<T[] | readonly T[]> {
    return this.page$.pipe(pluck('data'));
  }


  disconnect(): void {
    // throw new Error("Method not implemented.");
  }

}

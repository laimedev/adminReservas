import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteReservaComponent } from './delete-reserva.component';

describe('DeleteReservaComponent', () => {
  let component: DeleteReservaComponent;
  let fixture: ComponentFixture<DeleteReservaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteReservaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEmpleadoComponent } from './view-empleado.component';

describe('ViewEmpleadoComponent', () => {
  let component: ViewEmpleadoComponent;
  let fixture: ComponentFixture<ViewEmpleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewEmpleadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

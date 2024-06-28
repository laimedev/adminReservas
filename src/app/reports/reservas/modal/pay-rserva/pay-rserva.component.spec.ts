import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayRservaComponent } from './pay-rserva.component';

describe('PayRservaComponent', () => {
  let component: PayRservaComponent;
  let fixture: ComponentFixture<PayRservaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayRservaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayRservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

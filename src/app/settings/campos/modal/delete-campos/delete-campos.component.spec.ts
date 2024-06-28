import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCamposComponent } from './delete-campos.component';

describe('DeleteCamposComponent', () => {
  let component: DeleteCamposComponent;
  let fixture: ComponentFixture<DeleteCamposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteCamposComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteCamposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

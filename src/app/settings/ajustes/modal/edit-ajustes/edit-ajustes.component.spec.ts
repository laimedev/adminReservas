import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAjustesComponent } from './edit-ajustes.component';

describe('EditAjustesComponent', () => {
  let component: EditAjustesComponent;
  let fixture: ComponentFixture<EditAjustesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAjustesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAjustesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

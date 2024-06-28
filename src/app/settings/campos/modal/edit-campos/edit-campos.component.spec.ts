import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCamposComponent } from './edit-campos.component';

describe('EditCamposComponent', () => {
  let component: EditCamposComponent;
  let fixture: ComponentFixture<EditCamposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCamposComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCamposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

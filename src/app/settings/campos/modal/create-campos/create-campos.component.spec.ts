import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCamposComponent } from './create-campos.component';

describe('CreateCamposComponent', () => {
  let component: CreateCamposComponent;
  let fixture: ComponentFixture<CreateCamposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCamposComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCamposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjustesListComponent } from './ajustes-list.component';

describe('AjustesListComponent', () => {
  let component: AjustesListComponent;
  let fixture: ComponentFixture<AjustesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjustesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjustesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

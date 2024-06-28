import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CamposListComponent } from './campos-list.component';

describe('CamposListComponent', () => {
  let component: CamposListComponent;
  let fixture: ComponentFixture<CamposListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CamposListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CamposListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

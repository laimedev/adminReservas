import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CamposFormComponent } from './campos-form.component';

describe('CamposFormComponent', () => {
  let component: CamposFormComponent;
  let fixture: ComponentFixture<CamposFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CamposFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CamposFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

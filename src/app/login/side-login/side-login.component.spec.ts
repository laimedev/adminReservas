import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideLoginComponent } from './side-login.component';

describe('SideLoginComponent', () => {
  let component: SideLoginComponent;
  let fixture: ComponentFixture<SideLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

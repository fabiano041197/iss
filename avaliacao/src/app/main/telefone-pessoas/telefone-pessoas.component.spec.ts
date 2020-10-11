import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TelefonePessoasComponent } from './telefone-pessoas.component';

describe('TelefonePessoasComponent', () => {
  let component: TelefonePessoasComponent;
  let fixture: ComponentFixture<TelefonePessoasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelefonePessoasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelefonePessoasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

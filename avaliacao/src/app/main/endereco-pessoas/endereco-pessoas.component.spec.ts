import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnderecoPessoasComponent } from './endereco-pessoas.component';

describe('EnderecoPessoasComponent', () => {
  let component: EnderecoPessoasComponent;
  let fixture: ComponentFixture<EnderecoPessoasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnderecoPessoasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnderecoPessoasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

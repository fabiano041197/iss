import { Component, OnInit, ɵCompiler_compileModuleSync__POST_R3__ } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import { ApiService } from 'src/app/services/api.service';

class PessoaEndereco {
  endereco;
  principal=true;
}

class Pessoa {
  nome;
  sobrenome;
}

@Component({
  selector: 'app-endereco-pessoas',
  templateUrl: './endereco-pessoas.component.html',
  styleUrls: ['./endereco-pessoas.component.css']
})
export class EnderecoPessoasComponent implements OnInit {

  options: SelectItem[];
  pessoaEnderecos: PessoaEndereco[];
  pessoa = new Pessoa();
  enderecoForm = new PessoaEndereco();
  showForm: Boolean = false;
  pessoaId: string;

  constructor(private apiService: ApiService,
              private mensagemService: MessageService,
              private router: Router,
              private activateRoute: ActivatedRoute) { 
                this.options = [
                  {label: 'Sim', value: true }, 
                  {label: 'Nao', value: false }
                ];
  }

  ngOnInit(): void {
    this.activateRoute.params.subscribe((params:any) => {
      this.pessoaId = params["id"]
    })

    this.apiService.get("/pessoas/"+this.pessoaId).subscribe((pess:Pessoa) => {
      this.pessoa = pess;
    })    

    this.getDados();
  }


  getDados(){
    this.apiService.get("/pessoas/"+this.pessoaId+"/enderecos").subscribe((result:PessoaEndereco[]) => {
      this.pessoaEnderecos = result;
    })
  }

  cadastrar(){
    this.apiService.post("/pessoas/"+this.pessoaId+"/enderecos", this.enderecoForm).subscribe(result => {
      this.getDados();
      this.enderecoForm = new PessoaEndereco();
      this.sucesso("Registrado com sucesso!");
      this.showForm = false;
    }, error => {
      this.erro(error.error.message);
    })
  }

  sucesso(mensagem) {
    this.mensagemService.add({severity:'success', summary: 'Sucesso', detail: mensagem});
  }

  erro(mensagem) {
    this.mensagemService.add({severity:'error', summary: 'Erro', detail: mensagem});
  }
}

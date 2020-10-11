import { NgxMaskModule } from 'ngx-mask';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ApiService } from 'src/app/services/api.service';

class Pessoa {
  id;
  nome;
  sobrenome;
  cnpj;
}

@Component({
  selector: 'app-pessoas',
  templateUrl: './pessoas.component.html',
  styleUrls: ['./pessoas.component.css']
})
export class PessoasComponent implements OnInit {

  mascaraDocumento: String = "999.999.999-99";
  pessoas: Pessoa[];
  pessoaForm = new Pessoa();
  pessoasSel: Pessoa[];
  showFormPessoa: Boolean = false;

  constructor(private apiService: ApiService,
    private mensagemService: MessageService,
    private router: Router) { }

  ngOnInit(): void {
    this.getDados();
    //this.router.navigate(['main/pessoas/1000/endereco'])
  }


  getDados() {
    this.apiService.get("/pessoas").subscribe(result => {
      this.pessoas = result["content"];
    })
  }

  cadastrar() {
    this.apiService.post("/pessoas", this.pessoaForm).subscribe(result => {
      console.log(result);
      this.getDados();
      this.pessoaForm = new Pessoa();
      this.sucesso("Registrado com sucesso!");
      this.showFormPessoa = false;
    }, error => {
      this.erro(error.error.message);
    })
  }

  sucesso(mensagem) {
    this.mensagemService.add({ severity: 'success', summary: 'Sucesso', detail: mensagem });
  }

  erro(mensagem) {
    this.mensagemService.add({ severity: 'error', summary: 'Erro', detail: mensagem });
  }


  deletar(dado = null) {
    if (dado != null) {
      this.apiService.delete("/pessoas/" + dado.id).subscribe(result => {
        this.sucesso("Removido com sucesso!");
        this.getDados();
      }, error => {
        this.erro(error.error.message);
      })
    } else {
      let erro = false;
      this.pessoasSel.forEach(auxPessoa => {
        this.apiService.delete("/pessoas/" + auxPessoa.id).subscribe(result => {
          this.getDados();
        }, error => {
          erro = true;
        })
      });

      if(!erro){
        this.sucesso("Registros removidos!");
      }else{
        this.erro("Nem todos os registros puderam ser removidos!");
      }
    }
  }

}

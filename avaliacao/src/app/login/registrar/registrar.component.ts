import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from '../Usuario';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  constructor(private usuarioService: UsuarioService,
             private mensagemService: MessageService,
             private router: Router) { }

  usuario: Usuario = {
    login: null,
    senha: null
  }

  repetirSenha: String= "";

  ngOnInit(): void {
  }

  registrar(){
    if(this.usuario.login.length < 5){
      this.erro("Usuario precisa conter no mínimo 5 caracteres!");
    }else if(this.usuario.senha != this.repetirSenha){
      this.erro("Senhas diferentes!");
    }else if(this.usuario.senha.length < 8){
      this.erro("Senha precisa conter no mínimo 8 caracteres!");
    }else{
      this.usuarioService.registrar(this.usuario).subscribe(result => {
        this.sucesso("Usuario criado com sucesso!")
        setTimeout(() => {
          this.router.navigate(['/']);
        },
        1000);
      }, error => {
        this.erro(error.error.message)
      })
    }

  }

  sucesso(mensagem) {
    this.mensagemService.add({severity:'success', summary: 'Sucesso', detail: mensagem});
  }

  erro(mensagem) {
    this.mensagemService.add({severity:'error', summary: 'Erro', detail: mensagem});
  }

}

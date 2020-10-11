import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from '../Usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http: UsuarioService,
    private router: Router,
    private mensagemService: MessageService) { }

  usuario: Usuario = {
    login: "",
    senha: ""
  }

  ngOnInit(): void {
  }

  login() {
    if (this.usuario.login == "" || this.usuario.senha == "") {
      this.erro("Usuário e senha obrigatórios!")
    } else {
      let queryString = "?grant_type=password&username=" + this.usuario.login + "&password=" + this.usuario.senha
      let auth = this.http.login(queryString).subscribe(data => {
        if (data["access_token"]) {
          document.cookie = "auth=" + data["access_token"];
          this.http.autenticado = true;
          this.router.navigate(['main'])
        }
      }, error => {
        this.erro("Usuário ou senha inválidos!");
      })
    }
  }

  sucesso(mensagem) {
    this.mensagemService.add({ severity: 'success', summary: 'Sucesso', detail: mensagem });
  }

  erro(mensagem) {
    this.mensagemService.add({ severity: 'error', summary: 'Erro', detail: mensagem });
  }

}

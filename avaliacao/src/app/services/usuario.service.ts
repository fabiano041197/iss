import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Header } from 'primeng/api';
import { browser } from 'protractor';

const url = "http://localhost:8080"

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  autenticado: boolean = false;

  httpHeaders = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'Basic Y2xpZW50LWlkOnNlY3JldC1pZA=='
    })
  };

  constructor(private http: HttpClient,
              private router: Router) { }

  login(usuario){
    let auth = false; 
    return this.http.post(url+"/oauth/token"+usuario, {}, this.httpHeaders);
  }

  registrar(usuario){
    return this.http.post(url+"/usuario", usuario, this.httpHeaders);
  }

  usuarioAutenticado(){
    //Inserir validaçao do cookie!
    let authToken = null;
    authToken = this.getToken("auth");
    
    if(authToken){
      this.autenticado = true
    }

    return this.autenticado;
  }

  getToken(cookie){
    let cookieValor = "";
    let cookies = document.cookie.split(";");
    cookies.forEach(data => {
      if(data.split("=")[0] == cookie && data.split("=")[1] != ""){
        cookieValor = data.split("=")[1];
      }
    })

    return cookieValor;
  }

  checkToken(token){
    return this.http.get(url+"/oauth/check_token?grant_type=password&token="+token, this.httpHeaders)
  }
}

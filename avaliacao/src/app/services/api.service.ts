import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioService } from './usuario.service';
import { ThrowStmt } from '@angular/compiler';

const url = "http://localhost:8080";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient,
              private usuarioService: UsuarioService) { }

  httpHeaders = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'bearer '+this.usuarioService.getToken("auth")
    })
  };

  get(path){
    return this.http.get(url+path, this.httpHeaders)
  }

  post(path, body){
    return this.http.post(url+path, body, this.httpHeaders);
  }

  delete(path){
    return this.http.delete(url+path, this.httpHeaders)
  }

  put(path, body){
    return this.http.put(url, body, this.httpHeaders)
  }

}

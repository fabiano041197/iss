import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { RSA_NO_PADDING } from 'constants';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root' 
})
export class AuthGuardService implements CanActivate{

  constructor(private usuarioService: UsuarioService,
              private router: Router,
              private http: HttpClient,
              private cookie: CookieService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean{
    let isAutenticado = false;
    this.usuarioService.checkToken(this.usuarioService.getToken("auth"))
      .subscribe(result => {
        if(!result["error"]){
          if(result["error"] == "invalid_token"){
            this.cookie.deleteAll();
          }
        }
      }, error => {
        
        this.logOut();
      })

    if(this.usuarioService.usuarioAutenticado()){
      return true
    }

    this.router.navigate(["/"])
    return false;
  }

  logOut() {
    this.cookie.deleteAll('');
    this.router.navigateByUrl('');
  }
}

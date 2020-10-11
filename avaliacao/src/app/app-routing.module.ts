import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './guards/auth-guard.service';
import { LoginComponent } from './login/login/login.component';
import { RegistrarComponent } from './login/registrar/registrar.component';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { EnderecoPessoasComponent } from './main/endereco-pessoas/endereco-pessoas.component';
import { MainComponent } from './main/main/main.component';
import { PessoasComponent } from './main/pessoas/pessoas.component';
import { TelefonePessoasComponent } from './main/telefone-pessoas/telefone-pessoas.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'registrar', component: RegistrarComponent },
  { path: 'main', component: MainComponent, canActivate: [ AuthGuardService ],  children: [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'pessoas', component: PessoasComponent },
    { path: 'pessoas/:id/endereco', component: EnderecoPessoasComponent },
    { path: 'pessoas/:id/telefone', component: TelefonePessoasComponent }
    
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

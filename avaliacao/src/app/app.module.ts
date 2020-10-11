import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMaskModule, IConfig } from 'ngx-mask'

//Primeng Componentes
import {CardModule} from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { MegaMenuModule } from 'primeng/megamenu';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { CheckboxModule } from 'primeng/checkbox';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputMaskModule } from 'primeng/inputmask';
import { TooltipModule } from 'primeng/tooltip';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login/login.component';
import { FormsModule } from '@angular/forms';
import { MainComponent } from './main/main/main.component';
import { RegistrarComponent } from './login/registrar/registrar.component';
import { PessoasComponent } from './main/pessoas/pessoas.component';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { MenuComponent } from './main/menu/menu.component';
import { EnderecoPessoasComponent } from './main/endereco-pessoas/endereco-pessoas.component';
import { TelefonePessoasComponent } from './main/telefone-pessoas/telefone-pessoas.component';
import { CpfCnpjPipe } from './pipes/cpfCnpj.pipe';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    RegistrarComponent,
    PessoasComponent,
    DashboardComponent,
    MenuComponent,
    EnderecoPessoasComponent,
    TelefonePessoasComponent,
    CpfCnpjPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    HttpClientModule,
    ToastModule,
    MegaMenuModule,
    PanelModule,
    TableModule,
    DialogModule,
    ToggleButtonModule,
    CheckboxModule,
    SelectButtonModule,
    InputMaskModule,
    NgxMaskModule.forRoot(),
    TooltipModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MeuPrimeiroComponent } from "./meu-primeiro/meu-primeiro.component";
import { MeuSegundoComponent } from './meu-segundo/meu-segundo.component';
import { CursosModule } from './cursos/cursos.module';
import { DataBindingComponent } from './data-binding/data-binding.component';
import { InputPropertyComponent } from './input-property/input-property.component';
import { OutputPropertyComponent } from './output-property/output-property.component';
import { CicloComponent } from './ciclo/ciclo.component';

@NgModule({
  declarations: [
    AppComponent,
    MeuPrimeiroComponent,
    MeuSegundoComponent,
    DataBindingComponent,
    InputPropertyComponent,
    OutputPropertyComponent,
    CicloComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CursosModule
  ],
  exports:[
    InputPropertyComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

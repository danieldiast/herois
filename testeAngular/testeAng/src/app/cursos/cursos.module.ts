import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { InputPropertyComponent } from '../input-property/input-property.component';
// import { InputPropertyComponent } from '../app.module';

import { CursosComponent } from './cursos.component';
import { CursoDetalheComponent } from './curso-detalhe/curso-detalhe.component';
import { CursosService } from './cursos.service';



@NgModule({
  declarations: [CursosComponent, CursoDetalheComponent],
  imports: [
    CommonModule
    // ,InputPropertyComponent
  ],
  exports: [
    CursosComponent
  ],
  providers: [CursosService]
})
export class CursosModule { }

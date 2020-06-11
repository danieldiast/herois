import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'testeAngzz';
  anyBs = 'ANYBULLY';
  valor = 5;
  deletarCiclo = false;
  
  mudarValor(){
    this.valor++;
  } 

  destruirCiclo(){
    this.deletarCiclo = !this.deletarCiclo;
  } 

}

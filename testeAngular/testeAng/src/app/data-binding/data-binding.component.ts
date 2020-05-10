import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-data-binding',
  templateUrl: './data-binding.component.html',
  styleUrls: ['./data-binding.component.css']
})
export class DataBindingComponent implements OnInit {

  url: string = 'http://testedatabinding.cão';
  urlImagem = "https://i.picsum.photos/id/278/200/300.jpg";
  cursoAngular: boolean = true;
  valorAtual = '';
  valorSalvo= '';
  isMouseOver= false;
  nome2w: string = "abc";
  pessoa: any = {
    nome: "def",
    idade: 20
  };

  nomeDoCurso: string = "primeiro nome";

  getValor(){
    return 1;
  }

  getCurtirCurso(){
    return true;
  }

  botaoClicado(){
    alert();
  }

  onMouseOver(){
    this.isMouseOver = !this.isMouseOver;
  }

  onMouseOut(){
    this.isMouseOver = !this.isMouseOver;
  }

  onKeyUp(e: KeyboardEvent){

    console.log(this.valorAtual);
    this.valorAtual = (<HTMLInputElement>e.target).value
  }

  salvarValor(valor: string){
    this.valorSalvo = valor;

  }

  constructor() { }

  ngOnInit(): void {
  }

}

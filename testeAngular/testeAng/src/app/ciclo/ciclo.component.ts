import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ciclo',
  templateUrl: './ciclo.component.html',
  styleUrls: ['./ciclo.component.css']
})
export class CicloComponent implements OnInit {

  @Input() valorInicial:number = 10;

  constructor() { 
    this.log('construtor');
    
  }

  ngOnChanges(){
    this.log('ngOnChanges');
  }

  ngOnInit(): void {
    this.log('ngOnInit');
  }
  
  ngDoCheck(){
    this.log('ngDoCheck');
  }
  
  ngAfterContentInit(){
    this.log('ngAfterContentInit');
  }

  ngAfterContentChecked(){
    this.log('ngAfterContentChecked');
  }

  ngAfterViewInit(){
    this.log('ngAfterViewInit');
  }

  ngAfterViewChecked(){
    this.log('ngAfterViewChecked');
  }

  ngOnDestroy(){
    this.log('ngOnDestroy');
  }

  private log(str){
    console.log("clclo:"+str+" valor:"+this.valorInicial);
  }


}

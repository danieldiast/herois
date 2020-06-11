console.log('HL');

import * as _ from 'lodash';

async function hello(){
    return 'world';
};
hello();

type Style = 'string' | 'italic';
let font: Style;
font = 'string';

let lucky= 23;

interface Person {
    first: string;
    last: string;
    [key: string]: any;
}

const person1: Person = {
    first: 'ronaldo',
    last: 'last',
    qualquer: 234
}

let person2: Person = {
    first: 'p2',
    last: "l2"
}

function pow(x: number, y: number): string{
    return Math.pow(x,y).toString();
}


pow(23, 0);

class Observable<T> {
     constructor(public value: T){

     }

}

let x: Observable<number>;
let y: Observable<number>;
let z = new Observable(234);
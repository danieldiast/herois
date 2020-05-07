var minhaVar = "minha varrr";
alert(minhaVar);
function minhaFunc(x, y) {
    return x + y;
}
var num = 2;
var PI = 3.14;
var num2 = 123;
var str = '1234';
var numeros = [1, 2, 3];
numeros.map(function (valor) {
    return valor * 2;
});
numeros.map(function (valor) { return valor * 2; });
var Matematica = /** @class */ (function () {
    function Matematica() {
    }
    Matematica.prototype.soma = function (a, b) {
        return a + b;
    };
    return Matematica;
}());

// peca teste
		console.log('pecas teste');
		{
			let pecaSpider = document.createElement("div");	
			let personSpider = document.createElement("div");	
			pecaSpider.classList.add('peca');
			personSpider.classList.add('person');
			personSpider.classList.add('spiderman');
			pecaSpider.dataset.looking = "up";
			pecaSpider.dataset.char = "spiderman";
			pecaSpider.appendChild(personSpider);	

			let pecaWolv = document.createElement("div");	
			let personWolf = document.createElement("div");	
			pecaWolv.classList.add('peca');
			personWolf.classList.add('person');
			personWolf.classList.add('wolverine');
			pecaWolv.dataset.looking = "down";
			pecaWolv.dataset.char = "wolverine";
			pecaWolv.appendChild(personWolf);	

			// let celulas = document.getElementsByClassName("celula");
			// celulas[4].appendChild(peca);	
			arrayCelulas[4][4].appendChild(pecaSpider);
			arrayCelulas[2][2].appendChild(pecaWolv);
			pecaSpider.addEventListener('mousedown', mouseDownPeca, false);
			pecaWolv.addEventListener('mousedown', mouseDownPeca, false);
		}
		


		function mouseDownPeca(e) {
			console.log('mouseDownPeca');
			e.stopPropagation();  //apenas para cima
		//	e.stopImmediatePropagation(); << inclui o próprio elemento  

			if(e.target.classList.contains("selected")){
				e.target.classList.remove("selected");
				acoes.innerHTML = "";
				selecionado = null;
				return;
			}
			deselecionaTudo();
			selecionado = e.target;
			selecionado.classList.add("selected");
			//var currentSize = window.getComputedStyle(celulas[4])
			acoes.innerHTML = "Orientação: ";
			let bleft = document.createElement("button");	
			bleft.innerHTML = "&larr;"
			bleft.value = "left"
			let bdown = document.createElement("button");	
			bdown.innerHTML = "&darr;"
			bdown.value = "down"
			let bup = document.createElement("button");	
			bup.innerHTML = "&uarr;"
			bup.value = "up"
			let brigth = document.createElement("button");	
			brigth.innerHTML = "&rarr;"
			brigth.value = "right"

			bleft.addEventListener('click', look, false);
			bdown.addEventListener('click', look, false);
			bup.addEventListener('click', look, false);
			brigth.addEventListener('click', look, false);

			let bMirar = document.createElement("button");	
			let bAndar = document.createElement("button");	
			bMirar.innerHTML = "mirar"
			bMirar.id = "mirar"
			bMirar.value = "mirar"
			bAndar.innerHTML = "andar"
			bAndar.id = "andar"
			bAndar.value = "andar"
			bMirar.addEventListener('click', ativaMirar, false);
			bAndar.addEventListener('click', ativaAndar, false);

			acoes.appendChild(bleft);	
			acoes.appendChild(bdown);	
			acoes.appendChild(bup);	
			acoes.appendChild(brigth);	
			// acoes.innerHTML += "<br />";	
			acoes.appendChild(document.createElement("br"));	
			acoes.appendChild(bMirar);	
			acoes.appendChild(bAndar);	

			if(selecionado.dataset.char == "wolverine"){
				let bGarra = document.createElement("button");	
				bGarra.value = "garra"
				bGarra.id = "garra"
				bGarra.innerHTML = "garra"
				bGarra.addEventListener('click', ativaGarra, false);
				acoes.appendChild(document.createElement("br"));	
				acoes.appendChild(bGarra);	
			}

		}

		document.addEventListener('keydown', function (e){
			console.log(e.key+" "+e.keyCode);
			if(e.key === "Escape") {
				console.log('desativa');
				desativaMirar();
				desativaAndar();
			}
		},false)
		
		function ativaMirar(e){
			console.log("ativaMirar");
			pad.classList.remove("noPointerEvents")
			pad.addEventListener('mousemove', mirar, false);
			avisos.innerHTML = "ESC: sair";
			this.removeEventListener('click', ativaMirar, false);
			this.addEventListener('click', desativaMirar, false);
		}
		
		function desativaMirar(){
			console.log("desativaMirar");
			avisos.innerHTML = "";
			pad.classList.add("noPointerEvents")
			pad.removeEventListener('mousemove', mirar, false);
			limpaCanvas();
			document.querySelector("button#mirar").addEventListener('click', ativaMirar, false);
			document.querySelector("button#mirar").removeEventListener('click', desativaMirar, false)
			
			var person = document.querySelector('.peca.selected .person');
    		person.style.removeProperty('transition');
    		person.style.removeProperty('transform');

		}


		function ativaAndar(e){
			console.log("ativaAndar");
			tabuleiro.addEventListener('mousemove', preparaCaminho, false);
			tabuleiro.addEventListener('mousedown', preparaCaminhoInverte, false);
			avisos.innerHTML = "ESC: sair";
			this.removeEventListener('click', ativaAndar, false);
			this.addEventListener('click', desativaAndar, false);
		}
		
		function desativaAndar(){
			console.log("desativaAndar");
			avisos.innerHTML = "";
			tabuleiro.removeEventListener('mousemove', preparaCaminho, false);
			tabuleiro.removeEventListener('mousedown', preparaCaminhoInverte, false);
			document.querySelector("button#andar").addEventListener('click', ativaAndar, false);
			document.querySelector("button#andar").removeEventListener('click', desativaAndar, false);
			var anteriores = Array.from(document.getElementsByClassName('caminhoSimulado'));
			for(let celula of anteriores){
		    	celula.classList.remove("caminhoSimulado");
			}
		}

		function deselecionaTudo(){
			var elements = Array.from(document.getElementsByClassName('selected'));
			[].forEach.call(elements, function(el) {
		    	el.classList.remove("selected");
			});
			acoes.innerHTML = "";
			selecionado = null;
		}


		function look(e){
			console.log('look');
			var newLooking = e.target.value;
			var selecionada = document.querySelector('.peca.selected');
			selecionada.dataset.looking = newLooking;
		}

		var celulaDestino;
		var primeiroHorizontal = true;
		function preparaCaminhoInverte(e){
			console.log("preparaCaminhoInverte");
			if(e.button == 2){
				primeiroHorizontal = !primeiroHorizontal;
				preparaCaminho(e);
			}
			if(e.button == 0){
				console.log("moverPeca");
				moverPeca();
			}
		}

		const VELO_MOVER_PECA = 300;
		let animation;
		function moverPeca(){
			if(arrayCaminho.length == 0){
				return;
			}
			let celula = arrayCaminho.shift();
			let personSelecionada = document.querySelector('.peca.selected .person');
			let pecaSelecionada = personSelecionada.parentElement;
			let celulaAtual = pecaSelecionada.parentElement;
	    	
			// console.log(celula, celulaAtual);
			var animTop = "0%", animLeft = "0%";
			console.log("x",celulaAtual.dataset.coordX,celula.dataset.coordX)
			console.log("y",celulaAtual.dataset.coordY,celula.dataset.coordY)
			if(parseInt(celula.dataset.coordX) > parseInt(celulaAtual.dataset.coordX)){
				console.log('right')
				pecaSelecionada.dataset.looking = 'right';
				 animLeft = "100%"
			} if(parseInt(celula.dataset.coordX) < parseInt(celulaAtual.dataset.coordX)){
				console.log('left')
				pecaSelecionada.dataset.looking = 'left';
				 animLeft = "-100%"
			} if(parseInt(celula.dataset.coordY) > parseInt(celulaAtual.dataset.coordY)){
				console.log('down')
				pecaSelecionada.dataset.looking = 'down';
				animTop = "100%";
			} if(parseInt(celula.dataset.coordY) < parseInt(celulaAtual.dataset.coordY)){
				console.log('right')
				pecaSelecionada.dataset.looking = 'up';
				animTop = "-100%";
			}
			animation = personSelecionada.animate([
	    		 {top: "0%",left: "0%"},
	   			 {top: animTop,left: animLeft}
	   			],VELO_MOVER_PECA
			);
			setTimeout(() => {
				celula.appendChild(pecaSelecionada);
	    		celula.classList.remove("caminhoSimulado");
	    		animation.finish();
	    		moverPeca();
			},VELO_MOVER_PECA);
		}

		var arrayCaminho = [];
		function preparaCaminho(e){
			console.log("preparaCaminho");
			if(e.target == celulaDestino && e.type == "mousemove") {
				return
			}else if(!e.target.dataset.coordX) {
				return
			}
			celulaDestino = e.target;
			var celulaSelecionada = document.querySelector('.peca.selected').parentElement;
			let xOrigem = parseInt(celulaSelecionada.dataset.coordX);
			let yOrigem =  parseInt(celulaSelecionada.dataset.coordY);
			let xDest =  parseInt(celulaDestino.dataset.coordX);
			let yDest =  parseInt(celulaDestino.dataset.coordY);
			arrayCaminho = [];
			if(primeiroHorizontal){
				let x=xOrigem;
				while(x!=xDest && x<100 && x>=0){
					if(x < xDest) {x++}
					else {x--}
					arrayCaminho.push(arrayCelulas[yOrigem][x]);
				}
				let y=yOrigem;
				while(y!=yDest && y<100 && y>=0){
					if(y<yDest) {y++}
					else {y--}
					arrayCaminho.push(arrayCelulas[y][xDest]);
				}
			}else{
				console.log("primeiroVertical");
				let y=yOrigem;
				while(y!=yDest){
					if(y<yDest) {y++}
					else {y--}
					arrayCaminho.push(arrayCelulas[y][xOrigem]);
				}
				let x=xOrigem;
				while(x!=xDest){
					console.log(xOrigem,x,xDest);
					if(x < xDest) {x++}
					else {x--}
					arrayCaminho.push(arrayCelulas[yDest][x]);
				}
			}

			var anteriores = Array.from(document.getElementsByClassName('caminhoSimulado'));
			for(let celula of anteriores){
		    	celula.classList.remove("caminhoSimulado");
			}
			for(let celula of arrayCaminho){
				celula.classList.add('caminhoSimulado');
			}
		}


		function preparaCaminho2(e){
			console.log("preparaCaminho");
			if(e.target == celulaDestino && e.type == "mousemove") {
				return
			}else if(!e.target.dataset.coordX) {
				return
			}
			celulaDestino = e.target;
			var celulaSelecionada = document.querySelector('.peca.selected').parentElement;
			let xOrigem = parseInt(celulaSelecionada.dataset.coordX);
			let yOrigem =  parseInt(celulaSelecionada.dataset.coordY);
			let xDest =  parseInt(celulaDestino.dataset.coordX);
			let yDest =  parseInt(celulaDestino.dataset.coordY);
			arrayCaminho = [];
			if(primeiroHorizontal){
				let x=xOrigem;
				while(x!=xDest && x<100 && x>=0){
					if(x < xDest) {x++}
					else {x--}
					arrayCaminho.push(arrayCelulas[yOrigem][x]);
				}
				let y=yOrigem;
				while(y!=yDest && y<100 && y>=0){
					if(y<yDest) {y++}
					else {y--}
					arrayCaminho.push(arrayCelulas[y][xDest]);
				}
			}else{
				console.log("primeiroVertical");
				let y=yOrigem;
				while(y!=yDest){
					if(y<yDest) {y++}
					else {y--}
					arrayCaminho.push(arrayCelulas[y][xOrigem]);
				}
				let x=xOrigem;
				while(x!=xDest){
					console.log(xOrigem,x,xDest);
					if(x < xDest) {x++}
					else {x--}
					arrayCaminho.push(arrayCelulas[yDest][x]);
				}
			}

			var anteriores = Array.from(document.getElementsByClassName('caminhoSimulado'));
			for(let celula of anteriores){
		    	celula.classList.remove("caminhoSimulado");
			}
			for(let celula of arrayCaminho){
				celula.classList.add('caminhoSimulado');
			}
		}


		function ativaGarra(e){
			console.log("ativaGarra");
			selecionado.classList.add("garra");
			selecionado.classList.add("duasCelulas");
		}
		
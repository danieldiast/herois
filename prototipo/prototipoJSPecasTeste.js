// peca teste
		console.log('pecas teste');
		{
			let peca = document.createElement("div");	
			let person = document.createElement("div");	
			peca.classList.add('peca');
			person.classList.add('person');
			person.classList.add('spiderman');
			peca.dataset.looking = "up";
			peca.appendChild(person);	

			// let celulas = document.getElementsByClassName("celula");
			// celulas[4].appendChild(peca);	
			arrayCelulas[4][4].appendChild(peca);
			peca.addEventListener('mousedown', mouseDownPeca, false);
		}
		


		function mouseDownPeca(e) {
			console.log('mouseDownPeca');
			e.preventDefault();  // para o botao direito nao abrir
			e.stopPropagation();  //apenas para cima
		//	e.stopImmediatePropagation(); << inclui o próprio elemento  

			if(e.target.classList.contains("selected")){
				e.target.classList.remove("selected");
				acoes.innerHTML = "";
				return;
			}
			deselecionaTudo();
			e.target.classList.add("selected");
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
			document.querySelector("button#mirar").removeEventListener('click', desativaMirar, false);

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

		function moverPeca(){
			if(arrayCaminho.length > 0){
				let celula = arrayCaminho.shift();
				let selecionada = document.querySelector('.peca.selected');
		    	celula.classList.remove("caminhoSimulado");	
		    	celula.appendChild(selecionada);
				console.log(celula);
				setTimeout(moverPeca,100);
			}
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
				while(x!=xDest && x<100 && x>0){
					if(x < xDest) {x++}
					else {x--}
					arrayCaminho.push(arrayCelulas[yOrigem][x]);
				}
				let y=yOrigem;
				while(y!=yDest && y<100 && y>0){
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


		function ativaAndar(e){
			console.log("ativaAndar");
			arrayCaminhosParciais = [];
			arrayCaminho = [];
			tabuleiro.addEventListener('mousemove', preparaCaminho, false);
			tabuleiro.addEventListener('mousedown', preparaCaminhoMouse, false);
			avisos.innerHTML = "ESC: sair";
			this.removeEventListener('click', ativaAndar, false);
			this.addEventListener('click', desativaAndar, false);
			tabuleiro.addEventListener("dblclick", preparaCaminhoMouse, false);
			var celulaSelecionada = document.querySelector('.peca.selected').parentElement;
			xOrigem = parseInt(celulaSelecionada.dataset.coordX);
			yOrigem =  parseInt(celulaSelecionada.dataset.coordY);
		}
		
		function desativaAndar(){
			console.log("desativaAndar");
			avisos.innerHTML = "";
			tabuleiro.removeEventListener('mousemove', preparaCaminho, false);
			tabuleiro.removeEventListener('mousedown', preparaCaminhoMouse, false);
			document.querySelector("button#andar").addEventListener('click', ativaAndar, false);
			document.querySelector("button#andar").removeEventListener('click', desativaAndar, false);
			var anteriores = Array.from(document.getElementsByClassName('caminhoSimulado'));
			anteriores = anteriores.concat(Array.from(document.getElementsByClassName('caminhoParcial')));
			for(let celula of anteriores){
		    	celula.classList.remove("caminhoParcial");
		    	celula.classList.remove("caminhoSimulado");
		    	Array.from(celula.getElementsByClassName('passo')).forEach(passo => {
		    		celula.removeChild(passo);
		    	})		
			}
			arrayCaminhosParciais = [];
			arrayCaminho = [];
		}


		var celulaDestino;
		var primeiroHorizontal = true;
		function preparaCaminhoMouse(e){
			console.log(e.button);
			if(e.type == "dblclick"){
				moverPeca();
				return;
			}
			console.log("justMoved - "+justMoved);
			if(justMoved){
				return;
			}
			if(e.button == 1){ // bot meio
				primeiroHorizontal = !primeiroHorizontal;
				preparaCaminho(e);
				e.preventDefault();
			}
			if(e.button == 2){ // bot direito
				//volta parcial
				voltaCaminhoParcial(e);
			}
			if(e.button == 0){ // bot esquerdo
				preparaCaminhoParcial(e);
			}
		}

		const VELO_MOVER_PECA = 200; //maior =  mais lento
		let animation;
		function moverPeca(){
			if(arrayCaminhosParciais.length == 0){
				return;
			}
			let personSelecionada = document.querySelector('.peca.selected .person');
			let pecaSelecionada = personSelecionada.parentElement;
			let celulaAtual = pecaSelecionada.parentElement;
			//let celulaAnterior = celulaAtual;
			setTimeout(moverPecaAnimar(personSelecionada, pecaSelecionada, celulaAtual, 0, 0),0);
		}

		function moverPecaAnimar(personSelecionada, pecaSelecionada, celulaAnterior, animTop, animLeft){
			if(arrayCaminhosParciais.length > 0) {
				console.log('moverPecaAnimar - arrayCaminhosParciais.length = '+arrayCaminhosParciais.length);
				let caminhoParcial = arrayCaminhosParciais[0];
				if(caminhoParcial.length == 0){
					arrayCaminhosParciais.shift();
					return moverPecaAnimar(personSelecionada, pecaSelecionada, celulaAnterior, animTop, animLeft);
				}
				if(caminhoParcial.length > 0) {
					console.log('moverPecaAnimar - caminhoParcial.length = '+caminhoParcial.length);
					let proxCelula = caminhoParcial.shift();
					let animTopFinal = animTop;
					let animLeftFinal = animLeft;
					console.dir(proxCelula);
					if(parseInt(proxCelula.dataset.coordX) > parseInt(celulaAnterior.dataset.coordX)){
						console.log('right')
						pecaSelecionada.dataset.looking = 'right';
						animLeftFinal += 100
					} if(parseInt(proxCelula.dataset.coordX) < parseInt(celulaAnterior.dataset.coordX)){
						console.log('left')
						pecaSelecionada.dataset.looking = 'left';
						 animLeftFinal -= 100
					} if(parseInt(proxCelula.dataset.coordY) > parseInt(celulaAnterior.dataset.coordY)){
						console.log('down')
						pecaSelecionada.dataset.looking = 'down';
						animTopFinal += 100;
					} if(parseInt(proxCelula.dataset.coordY) < parseInt(celulaAnterior.dataset.coordY)){
						console.log('right')
						pecaSelecionada.dataset.looking = 'up';
						animTopFinal -= 100;
					}
					animation = personSelecionada.animate([
			   			 {top: animTop+"%",left: animLeft+"%"},
			   			 {top: animTopFinal+"%",left: animLeftFinal+"%"}
			   			],VELO_MOVER_PECA
					);
					animation.onfinish = function(){
						moverPecaAnimar(personSelecionada, pecaSelecionada, proxCelula, animTopFinal, animLeftFinal);
					};
			    	passos = Array.from(proxCelula.querySelectorAll('.passo[data-parcial=true]'));
			    	if(passos.length > 0){
			    		proxCelula.removeChild(passos.shift());
			    	}	
			    	if(passos.length == 0){	
			    		proxCelula.classList.remove("caminhoParcial");
			    	}	
			    	celulaAnterior = proxCelula;
			    	
				}
			}else{
				console.log('ultimaCelula - '+celulaAnterior)
				celulaAnterior.appendChild(pecaSelecionada);
				desativaAndar();
			}

			atualizaMiniTab();
		}

		
		function preparaCaminhoParcial(e){
			if(arrayCaminho.length<=0){
				return false;
			}
			let index = arrayCaminhosParciais.length;
			arrayCaminhosParciais[index] = arrayCaminho;
			ultimaCel = arrayCaminho[arrayCaminho.length-1]
			arrayCaminho = [];
			xOrigem = parseInt(ultimaCel.dataset.coordX);
			yOrigem =  parseInt(ultimaCel.dataset.coordY);
			var anteriores = Array.from(document.getElementsByClassName('caminhoSimulado'));
			for(let celula of anteriores){
		    	celula.classList.remove("caminhoSimulado");
		    	celula.classList.add("caminhoParcial");
		    	passo = celula.querySelector('.passo:last-child');
		    	passo.dataset.parcial = true;
			}
		}

		function voltaCaminhoParcial(e){
			let index = arrayCaminhosParciais.length;
			if(index==0) return;
			ultimoCaminho = arrayCaminhosParciais.pop();
			for(let celula of ultimoCaminho){
		    	passos = Array.from(celula.querySelectorAll('.passo[data-parcial=true]'));
		    	if(passos.length > 0){
		    		celula.removeChild(passos.pop());
		    		console.log(celula.innerHTML);
		    	}	
		    	if(passos.length == 0){	
		    		celula.classList.remove("caminhoParcial");
		    	}	
			}
			var ultimaCel;
			if(index>=2){
				ultimoCaminho = arrayCaminhosParciais[index-2];
				ultimaCel = ultimoCaminho[ultimoCaminho.length-1]
			}else{
				ultimaCel = document.querySelector('.peca.selected').parentElement;
			}
			if(ultimaCel != null){
				xOrigem = parseInt(ultimaCel.dataset.coordX);
				yOrigem =  parseInt(ultimaCel.dataset.coordY);
			}else{
				log.error("voltaCaminhoParcial - ultimaCel null");
			}
			preparaCaminho(e,true);	
		}

		var arrayCaminhosParciais = [];
		var arrayCaminho = [];
		var	xOrigem = 0;
		var	yOrigem =  0;
		function preparaCaminho(e, force = false){
			console.log("preparaCaminho: force="+force);
			if(e.target == celulaDestino && e.type == "mousemove" && force == false) {
				return;
			}
			celulaDestino = e.target;
			while(!celulaDestino.dataset.coordX){ //ate chegar na celula, caso haja algo dentro
				if(celulaDestino.parentNode == null){ //mal funcionamento que o obj fica sem pai
					console.error(celulaDestino);
				}
				celulaDestino = celulaDestino.parentNode;
				if(celulaDestino == tabuleiro){
					return;
				}
			}
			// var celulaSelecionada = document.querySelector('.peca.selected').parentElement;
			// let xOrigem = parseInt(celulaSelecionada.dataset.coordX);
			// let yOrigem =  parseInt(celulaSelecionada.dataset.coordY);
			let xDest =  parseInt(celulaDestino.dataset.coordX);
			let yDest =  parseInt(celulaDestino.dataset.coordY);
			console.log('xDest '+xDest);
			console.log('yDest '+yDest);
			arrayCaminho = [];
			Array.from(document.getElementsByClassName('caminhoSimulado')).forEach(celula => {
		    	celula.classList.remove("caminhoSimulado");
		    	// if(!celula.classList.contains("caminhoParcial")){
		    	// }
		    	passos = Array.from(celula.getElementsByClassName('passo'));
		    	if(passos.length > 0){
		    		celula.removeChild(passos.pop());
		    	}
			});

			if(primeiroHorizontal){
				let x=xOrigem;
				while(x!=xDest && x<100 && x>=0){
					var direcao = 'r'
					if(x < xDest) {x++;}
					else {x--; direcao = 'l'}
					let celulaAnterior = arrayCaminho[arrayCaminho.length-1]
					if(celulaAnterior == null){
						celulaAnterior = arrayCelulas[yOrigem][xOrigem];
					}
					if(!pushCelula(arrayCaminho, arrayCelulas[yOrigem][x], direcao, celulaAnterior)){
						return bloqueiaPreparaCaminho();
					}
				}
				let y=yOrigem;
				while(y!=yDest && y<100 && y>=0){
					var direcao = 'd'
					if(y<yDest) {y++}
					else {y--; direcao = 'u'}
					let celulaAnterior = arrayCaminho[arrayCaminho.length-1]
					if(celulaAnterior == null){
						celulaAnterior = arrayCelulas[yOrigem][xOrigem];
					}
					if(!pushCelula(arrayCaminho, arrayCelulas[y][xDest], direcao, celulaAnterior)){
						return bloqueiaPreparaCaminho();
					}
				}
			}else{
				let y=yOrigem;
				while(y!=yDest && y<100 && y>=0){
					var direcao = 'd'
					if(y<yDest) {y++}
					else {y--; direcao = 'u'}
					let celulaAnterior = arrayCaminho[arrayCaminho.length-1]
					if(celulaAnterior == null){
						celulaAnterior = arrayCelulas[yOrigem][xOrigem];
					}
					if(!pushCelula(arrayCaminho, arrayCelulas[y][xOrigem], direcao, celulaAnterior)){
						return bloqueiaPreparaCaminho();
					}
				}
				let x=xOrigem;
				while(x!=xDest && x<100 && x>=0){
					var direcao = 'r'
					if(x < xDest) {x++}
					else {x--; direcao = 'l'}
					let celulaAnterior = arrayCaminho[arrayCaminho.length-1]
					if(celulaAnterior == null){
						celulaAnterior = arrayCelulas[yOrigem][xOrigem];
					}
					if(!pushCelula(arrayCaminho, arrayCelulas[yDest][x], direcao, celulaAnterior)){
						return bloqueiaPreparaCaminho();
					}
				}
			}

			atualizaMiniTab();

			// for(let celula of arrayCaminho){
			// 	celula.classList.add('caminhoSimulado');
			// }
		}

		function pushCelula(arrayCaminho, celula, direcao, celulaAnterior = null){
			if(celula.querySelector(".peca")!=null){
				return false;
			}
			let passo = document.createElement("span");	
			passo.classList.add('passo');
			if(direcao == 'u' || direcao == 'up' || direcao == 'w'){
				passo.dataset.passo = 'u';
				passo.innerHTML = '&uarr;';
				if(celula.querySelector(".parede.south")){
					return false;
				}
				if(celulaAnterior != null && celulaAnterior.querySelector(".parede.north")) {
					return false;
				}
			}else if(direcao == 'd' || direcao == 'down' || direcao == 's'){
				passo.dataset.passo = 'd';
				passo.innerHTML = '&darr;';
				if(celula.querySelector(".parede.north")){
					return false;
				}
				if(celulaAnterior != null && celulaAnterior.querySelector(".parede.south")) {
					return false;
				}

			}else if(direcao == 'l' || direcao == 'left' || direcao == 'a'){
				passo.dataset.passo = 'l';
				passo.innerHTML = '&larr;';
				if(celula.querySelector(".parede.east")){
					return false;
				}
				if(celulaAnterior != null && celulaAnterior.querySelector(".parede.west")) {
					return false;
				}


			}else if(direcao == 'r' || direcao == 'right' || direcao == 'd'){
				passo.dataset.passo = 'r';
				passo.innerHTML = '&rarr;';
				if(celula.querySelector(".parede.west")){
					return false;
				}
				if(celulaAnterior != null && celulaAnterior.querySelector(".parede.east")) {
					return false;
				}

			}
			arrayCaminho.push(celula);
			celula.classList.add('caminhoSimulado');
			celula.appendChild(passo);
			return true;
		}



		function bloqueiaPreparaCaminho(){


		}



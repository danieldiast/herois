 //ESTE ARQUIVO EXISTE COMO UMA VERSAO ALTERNATIVA APENAS  PARA TESTAR A ANIMAÇÃO COM TRANSITIONS

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

			if(document.querySelector(".peca.selected")!=null){
				document.querySelector("button#andar").addEventListener('click', ativaAndar, false);
				document.querySelector("button#andar").removeEventListener('click', desativaAndar, false);
			}
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

		const VELO_MOVER_PECA = 300; //maior =  mais lento
		// let animation;
		function moverPeca(){
			if(arrayCaminhosParciais.length == 0){
				return;
			}
			let personSelecionada = document.querySelector('.peca.selected .person');
			let pecaSelecionada = personSelecionada.parentElement;
			let celulaAtual = pecaSelecionada.parentElement;
			//let celulaAnterior = celulaAtual;
			testI =0;
			console.log(arrayCaminhosParciais);
			printCaminhos(arrayCaminhosParciais);
			arrayProximosParametros = [];
			personSelecionada.style.transition = "all 0.1s linear 0s";
			personSelecionada.classList.add("aboutToMove");
			//setTimeout(()=>{moverPecaAnimar(personSelecionada, pecaSelecionada, celulaAtual, 0, 0)},10);
			 //new Promise(()=>{moverPecaAnimar(personSelecionada, pecaSelecionada, celulaAtual, 0, 0)});
			 
			 personSelecionada.addEventListener('transitionend', function callBacktransitionend() {
				console.log(' primeira transitionend!!!!!!!!!!!!!!!!!!!!');
				personSelecionada.style.transition = "all 0.4s linear 0s";
				personSelecionada.removeEventListener('transitionend',callBacktransitionend);
				personSelecionada.classList.remove("aboutToMove");
				moverPecaAnimar(personSelecionada, pecaSelecionada, celulaAtual, 0, 0);
			});
		}

		var testI =0;
		var arrayProximosParametros = [];
		function moverPecaAnimar(personSelecionada, pecaSelecionada, celulaAnterior, animTop, animLeft){
			console.log("iteração "+testI+" - ");
			if(arrayCaminhosParciais.length > 0) {
				let caminhoParcial = arrayCaminhosParciais[0];
				console.dir(caminhoParcial);
				if(caminhoParcial.length == 0){
					arrayCaminhosParciais.shift();
					console.log('aqui-------------------');
					return moverPecaAnimar(personSelecionada, pecaSelecionada, celulaAnterior, animTop, animLeft);
				}
				if(caminhoParcial.length > 0) {
					let proxCelula = caminhoParcial.shift();
					let animTopFinal = animTop;
					let animLeftFinal = animLeft;
					console.log('celulaAnterior x='+celulaAnterior.dataset.coordX+' y='+celulaAnterior.dataset.coordY);
					console.log('proxCelula x='+proxCelula.dataset.coordX+' y='+proxCelula.dataset.coordY);
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
						console.log('up')
						pecaSelecionada.dataset.looking = 'up';
						animTopFinal -= 100;
					}
					
					
					var callBackRecursivo = function(){
						let p = arrayProximosParametros.shift();
						if(p ==null || !p.hasOwnProperty('proxCelula')){
							return;
						}
						console.log(arrayProximosParametros);
						console.log(testI+' chamando recursivo com proxCelula x='+proxCelula.dataset.coordX+' y='+proxCelula.dataset.coordY);
					  //moverPecaAnimar(personSelecionada, pecaSelecionada, celulaAnterior, animTop, animLeft)
					    moverPecaAnimar(p.personSelecionada, p.pecaSelecionada, p.proxCelula, p.animTopFinal, p.animLeftFinal);
						console.log(testI+' saindo recursivo com proxCelula x='+proxCelula.dataset.coordX+' y='+proxCelula.dataset.coordY);
					};

					var transitionEvent = whichTransitionEvent();
					//transitionEvent && 
					personSelecionada.addEventListener('transitionend', function callBacktransitionend() {
						console.log(' Transition complete!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
						personSelecionada.removeEventListener('transitionend',callBacktransitionend);
						callBackRecursivo();
						
					});

					console.log(testI+' entrando em animation com proxCelula x='+proxCelula.dataset.coordX+' y='+proxCelula.dataset.coordY);
					var novoTop = animTopFinal+"%"
					var novoLeft = animLeftFinal+"%"
					//personSelecionada.style.transition = "top 1s linear 0s, left 1s linear 0s"
					personSelecionada.style.transition = "all 0.5s linear 0.1s";
					console.log("transition "+personSelecionada.style.transition);
					personSelecionada.style.top = novoTop;
					personSelecionada.style.left = novoLeft;
					testI++;
					arrayProximosParametros.push({personSelecionada, pecaSelecionada, proxCelula, animTopFinal, animLeftFinal});
					console.log(testI+' proxCelula x='+proxCelula.dataset.coordX+' y='+proxCelula.dataset.coordY);
					
					
					

					//animation.onfinish = callBackRecursivo;
					
			    	passos = Array.from(proxCelula.querySelectorAll('.passo[data-parcial=true]'));
			    	if(passos.length > 0){
			    		proxCelula.removeChild(passos.shift());
			    	}	
			    	if(passos.length == 0){	
						//proxCelula.style.transition = "all 5s linear 0s";
						proxCelula.classList.remove("caminhoParcial");
			    	}	
					celulaAnterior = proxCelula;
			    	
				}
			}else{
				let logAcao = pecaSelecionada.dataset.char;
				logAcao+=" moveu de ";
				logAcao+="x"+pecaSelecionada.parentElement.dataset.coordX;
				logAcao+=" ";
				logAcao+="y"+pecaSelecionada.parentElement.dataset.coordY;
				logAcao+=" para ";
				logAcao+="x"+celulaAnterior.dataset.coordX;
				logAcao+=" ";
				logAcao+="y"+celulaAnterior.dataset.coordY;
				loga(logAcao);
				personSelecionada.style.transition = "0"
				personSelecionada.style.top = 0;
				personSelecionada.style.left = 0;
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
						celulaAnterior = tabuleiroObj.arrayCelulas[yOrigem][xOrigem];
					}
					if(!pushCelula(arrayCaminho, tabuleiroObj.arrayCelulas[yOrigem][x], direcao, celulaAnterior)){
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
						celulaAnterior = tabuleiroObj.arrayCelulas[yOrigem][xOrigem];
					}
					if(!pushCelula(arrayCaminho, tabuleiroObj.arrayCelulas[y][xDest], direcao, celulaAnterior)){
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
						celulaAnterior = tabuleiroObj.arrayCelulas[yOrigem][xOrigem];
					}
					if(!pushCelula(arrayCaminho, tabuleiroObj.arrayCelulas[y][xOrigem], direcao, celulaAnterior)){
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
						celulaAnterior = tabuleiroObj.arrayCelulas[yOrigem][xOrigem];
					}
					if(!pushCelula(arrayCaminho, tabuleiroObj.arrayCelulas[yDest][x], direcao, celulaAnterior)){
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


		  function printCaminhos(arrayCaminhos){
			  let str = '';
			//   arrayCaminhos.forEach({
			// 	str= str+' '+this;
			//   });
			  for(c in arrayCaminhos){
				str= str+' '+c;
			  }
			  console.log(str);
		  }



		  function sleep(milliseconds) {
			// const date = Date.now();
			// let currentDate = null;
			// do {
			//   currentDate = Date.now();
			// } while (currentDate - date < milliseconds);
			
 			 return new Promise(r => setTimeout(r, milliseconds));
		  }




		  /* From Modernizr -------------------------------------https://davidwalsh.name/css-animation-callback-----------------*/
		function whichTransitionEvent(){
			var t;
			var el = document.createElement('fakeelement');
			var transitions = {
			'transition':'transitionend',
			'OTransition':'oTransitionEnd',
			'MozTransition':'transitionend',
			'WebkitTransition':'webkitTransitionEnd'
			}

			for(t in transitions){
				if( el.style[t] !== undefined ){
					console.log("transition: "+transitions[t]);
					return transitions[t];
				}
			}
		}

		// /* Listen for a transition! */
		// var transitionEvent = whichTransitionEvent();
		// transitionEvent && e.addEventListener(transitionEvent, function() {
		// 	console.log('Transition complete!  This is the callback, no library needed!');
		// });
		  /* /From Modernizr ------------------------------------------------------------------------------------------*/

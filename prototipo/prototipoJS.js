
		console.log('inicio');

		var tabuleiro = document.getElementById("tabuleiro");
		var arrayCelulas = [];

		var posAtualTabTop = 0;
		var posAtualTabLeft = 0;

		var sizeAtualCelula = 64;
		var sizeAtualTabuleiro = 6600;

		var moldeWidth = 600;
		var moldeHeight = 600;

		var selecionado;

		//inicia tabuleiro
		function iniciaTabuleiro() {
			for(let i= 0;i<100;i++){
				let linha = document.createElement("div");	
				linha.classList.add('linha');
				linha.dataset.coordX = i;
				arrayCelulas[i] = [];
				for(var j= 0;j<100;j++){
					let celula = document.createElement("div");	
					celula.style.width = sizeAtualCelula+"px";
					celula.style.height = sizeAtualCelula+"px";
					celula.classList.add('celula');
					linha.appendChild(celula);	
					
					celula.dataset.coordX = j;
					celula.dataset.coordY = i;
					arrayCelulas[i][j]=celula;
				}
				tabuleiro.appendChild(linha);	
			}
			arrayCelulas[2][3].appendChild(getParede('north'));
			arrayCelulas[2][3].appendChild(getParede('west'));
			arrayCelulas[3][3].appendChild(getParede('west'));
			arrayCelulas[4][3].appendChild(getParede('west'));
			arrayCelulas[5][3].appendChild(getParede('west'));
			arrayCelulas[6][3].appendChild(getParede('west'));
			arrayCelulas[6][3].appendChild(getParede('south'));
			arrayCelulas[6][4].appendChild(getParede('south'));
			arrayCelulas[6][5].appendChild(getParede('south'));
			arrayCelulas[6][6].appendChild(getParede('south'));
			arrayCelulas[6][7].appendChild(getParede('south'));
			arrayCelulas[6][7].appendChild(getParede('east'));
			arrayCelulas[5][7].appendChild(getParede('east'));
			arrayCelulas[3][7].appendChild(getParede('east'));
			arrayCelulas[2][7].appendChild(getParede('east'));
			arrayCelulas[2][7].appendChild(getParede('north'));
			arrayCelulas[2][6].appendChild(getParede('north'));
			arrayCelulas[2][5].appendChild(getParede('north'));

			arrayCelulas[1][7].appendChild(getParede('north'));
			arrayCelulas[1][7].appendChild(getParede('south'));
			arrayCelulas[1][7].appendChild(getParede('west'));
			arrayCelulas[1][7].appendChild(getParede('east'));

			tabuleiro.style.top = posAtualTabTop+"px";
			tabuleiro.style.left = posAtualTabLeft+"px";
			tabuleiro.style.width = sizeAtualTabuleiro+"px";
			tabuleiro.style.height = sizeAtualTabuleiro+"px";
			canvasTabuleiro.style.width = sizeAtualTabuleiro+"px";
			canvasTabuleiro.style.height = sizeAtualTabuleiro+"px";

			canvasTabuleiro.height = sizeAtualTabuleiro;
			canvasTabuleiro.width = sizeAtualTabuleiro;
		}

		function getParede(paredeClass){
			let parede = document.createElement("div");	
			parede.classList.add('parede');	
			parede.classList.add(paredeClass);	
			return parede;
		}
		iniciaTabuleiro();
		tabuleiro.addEventListener('contextmenu', event => event.preventDefault());
		
		tabuleiro.addEventListener('mousedown', mouseDownMoveTabuleiro, false);
		
		window.addEventListener('mouseup', mouseUpMoveTabuleiro, false);
		tabuleiro.addEventListener('mousewheel', resizeTabuleiro, false);

		var justMoved = false;
		function mouseUpMoveTabuleiro() {
		    window.removeEventListener('mousemove', moveTabuleiro, true);
			avisos.innerHTML = "";		
			tabuleiro.style.cursor = "default";	
			justMoved = false;
		}

		function mouseDownMoveTabuleiro(e) {
			if(e.button == 0){
		    	window.addEventListener('mousemove', moveTabuleiro, true);
				avisos.innerHTML = "CTRL: mais devagar - SHIFT: mais rápido";
				tabuleiro.style.cursor = "move";
			}else if(e.button == 2){
				e.preventDefault();  	
				if(e.target.classList.contains("celula")){
					avisos.innerHTML = e.target.dataset.coordX+" - "+e.target.dataset.coordY;

				}
			}
		}



		function moveTabuleiro(e) {
			console.log('moveTabuleiro');
			var tabuleiro = document.getElementById("tabuleiro");
			if(e.ctrlKey){
				if(e.movementY>1)posAtualTabTop+=1;
				if(e.movementY<0)posAtualTabTop-=1;
				if(e.movementX>1)posAtualTabLeft+=1;
				if(e.movementX<0)posAtualTabLeft-=1;
			}else if(e.shiftKey){
				posAtualTabTop+=e.movementY*10;
				posAtualTabLeft+=e.movementX*10;

			} else{
				posAtualTabTop+=e.movementY;
				posAtualTabLeft+=e.movementX;
			}
			moveTabuleiroLimitaRange();
			justMoved = true;
		};


		function moveTabuleiroLimitaRange(){
			const ESPACO_EXTRA= 100;
			if(posAtualTabTop < -sizeAtualTabuleiro + moldeHeight - ESPACO_EXTRA){
				posAtualTabTop = -sizeAtualTabuleiro + moldeHeight - ESPACO_EXTRA;
			}
			if(posAtualTabLeft < -sizeAtualTabuleiro + moldeWidth - ESPACO_EXTRA){
				posAtualTabLeft = -sizeAtualTabuleiro + moldeWidth - ESPACO_EXTRA;
			}
			if(posAtualTabLeft < -sizeAtualTabuleiro + moldeWidth - ESPACO_EXTRA){
				posAtualTabLeft = -sizeAtualTabuleiro + moldeWidth - ESPACO_EXTRA;
			}
			if(posAtualTabLeft > ESPACO_EXTRA){
				posAtualTabLeft = ESPACO_EXTRA;
			}
			if(posAtualTabTop > ESPACO_EXTRA){
				posAtualTabTop = ESPACO_EXTRA;
			}
		    tabuleiro.style.top = posAtualTabTop+"px";
		    tabuleiro.style.left = posAtualTabLeft+"px";
		}

		function resizeTabuleiro(e) {
			console.log('resizeTabuleiro');
			e.preventDefault();  	
			var y = event.deltaY;
			var factor = 5;
			if(e.ctrlKey){
				factor = 1;
			}else if(e.shiftKey){
				factor = 10
			}
			if (y > 0) {
				newSize = sizeAtualCelula - factor;
			} else {
				newSize = sizeAtualCelula + factor;
			}
			console.log(newSize);
			if(newSize < 6 || newSize > 128) {
				return;
			}else{
				sizeAtualCelula = newSize;
				sizeAtualTabuleiro = ((newSize+2)*100)
			}
			var celulas = document.getElementsByClassName("celula");
			for(var i=0;i<celulas.length;i++){
				celulas[i].style.width = sizeAtualCelula + "px";
				celulas[i].style.height = sizeAtualCelula + "px";
			}
			var pecas = document.getElementsByClassName("peca");
			for(var i=0;i<pecas.length;i++){
				pecas[i].style.width = sizeAtualCelula + "px";
				pecas[i].style.height = sizeAtualCelula + "px";
			}
			var linhas = document.getElementsByClassName("linha")
			for(var i=0;i<linhas.length;i++){
				linhas[i].style.width = sizeAtualTabuleiro + "px";
				linhas[i].style.height = sizeAtualCelula + "px";
			}


			tabuleiro.style.width = sizeAtualTabuleiro + "px";
			tabuleiro.style.height = sizeAtualTabuleiro + "px";
			var canvasTabuleiro = document.getElementById("canvasTabuleiro");
			canvasTabuleiro.style.width = sizeAtualTabuleiro + "px";
			canvasTabuleiro.style.height = sizeAtualTabuleiro + "px";

			canvasTabuleiro.height = sizeAtualTabuleiro;
			canvasTabuleiro.width = sizeAtualTabuleiro;
			moveTabuleiroLimitaRange();
		};



		function sleep(milliseconds) {
		  var start = new Date().getTime();
		  for (var i = 0; i < 1e7; i++) {
		    if ((new Date().getTime() - start) > milliseconds){
		      break;
		    }
		  }
		}

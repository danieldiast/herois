
		console.log('inicio');

		var tabuleiro = document.getElementById("tabuleiro");
		var arrayCelulas = [];

		var posAtualTabTop = -60;
		var posAtualTabLeft = -100;

		const QUANT_CELULAS = 100;
		const OUTSIDE_BORDER_CELULA_ADD = 0;
		var percentualAtualTabSize = 100;
		var sizeAtualTabuleiro = (tabSize[100]+OUTSIDE_BORDER_CELULA_ADD)*QUANT_CELULAS;
		var moldeWidth = 600;
		var moldeHeight = 600;

		var selecionado;

		//inicia tabuleiro
		function iniciaTabuleiro() {
			let sizeAtualCelula = tabSize[100];
			for(let i= 0;i<QUANT_CELULAS;i++){
				let linha = document.createElement("div");	
				linha.classList.add('linha');
				linha.dataset.coordX = i;
				linha.style.width = sizeAtualTabuleiro+"px";
				linha.style.height = sizeAtualCelula+"px";
				arrayCelulas[i] = [];
				for(var j= 0;j<QUANT_CELULAS;j++){
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



			arrayCelulas[10][10].appendChild(getParede('east'));
			arrayCelulas[10][11].appendChild(getParede('east'));
			arrayCelulas[11][10].appendChild(getParede('east'));
			arrayCelulas[10][12].appendChild(getParede('east'));
			arrayCelulas[10][9].appendChild(getParede('north'));
			arrayCelulas[10][11].appendChild(getParede('north'));
			arrayCelulas[10][12].appendChild(getParede('north'));
			arrayCelulas[9][12].appendChild(getParede('north'));
			arrayCelulas[12][12].appendChild(getParede('west'));
			arrayCelulas[11][12].appendChild(getParede('west'));
			arrayCelulas[11][11].appendChild(getParede('west'));
			arrayCelulas[13][11].appendChild(getParede('west'));
			arrayCelulas[14][11].appendChild(getParede('west'));
			arrayCelulas[15][11].appendChild(getParede('west'));
			arrayCelulas[16][11].appendChild(getParede('west'));
			arrayCelulas[17][11].appendChild(getParede('west'));
			arrayCelulas[11][13].appendChild(getParede('south'));
			arrayCelulas[11][9].appendChild(getParede('south'));
			arrayCelulas[9][9].appendChild(getParede('south'));
			arrayCelulas[12][9].appendChild(getParede('south'));

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
			parede.dataset.posicao = paredeClass;
			return parede;
		}
		
		iniciaTabuleiro();

		tabuleiro.addEventListener('contextmenu', event => event.preventDefault());
		tabuleiro.addEventListener('mouseover', mouseOverObjs);
		
		function mouseOverObjs(e){
			//e.target;
			//console.log(e.target);
			celula = e.target;
			while(!celula.classList.contains("celula")){
				celula = celula.parentElement;
				if(celula == tabuleiro){
					celula = null;
					break;
				}
			}
			panelMouseOver.innerHTML = "";
			if(celula != null){
				panelMouseOver.innerHTML +="celula x "+celula.dataset.coordX+" - y "+celula.dataset.coordY+" <br /> ";
			}
			if(e.target.classList.contains("parede")){
				panelMouseOver.innerHTML +=" parede "+e.target.dataset.posicao+" <br />";
			}
			if(e.target.classList.contains("person")){
				peca = e.target.parentElement; 
				panelMouseOver.innerHTML +="char "+peca.dataset.char+" <br />" ;
			}
			if(e.target.classList.contains("peca")){
				peca = e.target; 
				panelMouseOver.innerHTML +="char "+peca.dataset.char+" <br />" ;
			}
		}

		
		function sleep(milliseconds) {
		  var start = new Date().getTime();
		  for (var i = 0; i < 1e7; i++) {
		    if ((new Date().getTime() - start) > milliseconds){
		      break;
		    }
		  }
		}

		function removeClassSelection(selector, classToRemove){
			document.querySelectorAll(selector).forEach(selecionado => {
				selecionado.classList.remove(classToRemove);
			});
		}

		function log(... text){
			return console.log(text);
		}

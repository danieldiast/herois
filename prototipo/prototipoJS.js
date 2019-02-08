
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
					if(i<1 || j<=1 ||  i>=QUANT_CELULAS-50 ||  j>=QUANT_CELULAS-50){
						celula.dataset.type = "grass";
					}else if((j>2 && j<=7) &&  (i>=2 && i<=6)){
						celula.dataset.type = "floor";
					}else{
						celula.dataset.type = "ground";
					}

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

			arrayCelulas[3][9].appendChild(getParede('north'));
			arrayCelulas[3][9].appendChild(getParede('south'));
			arrayCelulas[3][9].appendChild(getParede('west'));
			arrayCelulas[3][9].appendChild(getParede('east'));
			arrayCelulas[3][9].dataset.type = "floor";

			// arrayCelulas[10][10].appendChild(getParede('east'));
			// arrayCelulas[10][11].appendChild(getParede('east'));
			// arrayCelulas[11][10].appendChild(getParede('east'));
			// arrayCelulas[10][12].appendChild(getParede('east'));
			// arrayCelulas[10][9].appendChild(getParede('north'));
			// arrayCelulas[10][11].appendChild(getParede('north'));
			// arrayCelulas[10][12].appendChild(getParede('north'));
			// arrayCelulas[9][12].appendChild(getParede('north'));
			// arrayCelulas[12][12].appendChild(getParede('west'));
			// arrayCelulas[11][12].appendChild(getParede('west'));
			// arrayCelulas[11][11].appendChild(getParede('west'));
			// arrayCelulas[13][11].appendChild(getParede('west'));
			// arrayCelulas[14][11].appendChild(getParede('west'));
			// arrayCelulas[15][11].appendChild(getParede('west'));
			// arrayCelulas[16][11].appendChild(getParede('west'));
			// arrayCelulas[17][11].appendChild(getParede('west'));
			// arrayCelulas[11][13].appendChild(getParede('south'));
			// arrayCelulas[11][9].appendChild(getParede('south'));
			// arrayCelulas[9][9].appendChild(getParede('south'));
			// arrayCelulas[12][9].appendChild(getParede('south'));

			tabuleiro.style.top = posAtualTabTop+"px";
			tabuleiro.style.left = posAtualTabLeft+"px";
			tabuleiro.style.width = sizeAtualTabuleiro+"px";
			tabuleiro.style.height = sizeAtualTabuleiro+"px";
			canvasTabuleiro.style.width = sizeAtualTabuleiro+"px";
			canvasTabuleiro.style.height = sizeAtualTabuleiro+"px";

			canvasTabuleiro.height = sizeAtualTabuleiro;
			canvasTabuleiro.width = sizeAtualTabuleiro;


			for(let i = 0;i<QUANT_CELULAS;i++){
				arrayCelulas[i][13].dataset.type = "street";
				arrayCelulas[i][14].dataset.type = "street";
				arrayCelulas[i][15].dataset.type = "street";
				arrayCelulas[i][16].dataset.type = "street";
				arrayCelulas[28][i].dataset.type = "street";
				arrayCelulas[29][i].dataset.type = "street";
				arrayCelulas[30][i].dataset.type = "street";
				arrayCelulas[31][i].dataset.type = "street";
			}
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

		document.querySelector("input.showGrid").addEventListener('click', e =>{
			if(e.target.checked){
				tabuleiro.classList.add("grid");
			}else{
				tabuleiro.classList.remove("grid");
			}
		});

		
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
			if(e.target.classList.contains("item")){
				item = e.target; 
				panelMouseOver.innerHTML +="item "+item.dataset.item+" <br />" ;
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


		function selectRandom(...array) {
		  return array[getRandomInt(0, array.length-1)];
		}

		function getRandomInt(min, max) {
		  min = Math.ceil(min);
		  max = Math.floor(max);
		  return Math.floor(Math.random() * (max - min + 1)) + min;
		}

		function getRandomLooking(){
				switch(getRandomInt(0, 3)){
					case 0:
						return "down";
					case 1:
						return "up";
					case 2:
						return "left";
					case 3:
						return "right";
			}
			return null;
		}

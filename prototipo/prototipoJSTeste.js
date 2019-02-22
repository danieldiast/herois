		console.log('inicioTeste');

		//inicia tabuleiro
		function iniciaTabuleiro() {
			tabuleiroObj = new Tabuleiro(QUANT_CELULAS,QUANT_CELULAS,tabuleiro);

			tabuleiro.style.top = posAtualTabTop+"px";
			tabuleiro.style.left = posAtualTabLeft+"px";
			tabuleiro.style.width = tabuleiroObj.sizeAtualTabuleiro+"px";
			tabuleiro.style.height = tabuleiroObj.sizeAtualTabuleiro+"px";
			canvasTabuleiro.style.width = tabuleiroObj.sizeAtualTabuleiro+"px";
			canvasTabuleiro.style.height = tabuleiroObj.sizeAtualTabuleiro+"px";

			molde.style.width = tabuleiroObj.moldeWidth+"px";
			molde.style.height = tabuleiroObj.moldeHeight+"px";

			canvasTabuleiro.height = tabuleiroObj.sizeAtualTabuleiro;
			canvasTabuleiro.width = tabuleiroObj.sizeAtualTabuleiro;

			for(let i= 0;i<QUANT_CELULAS;i++){
				for(var j= 0;j<QUANT_CELULAS;j++){
						let celula = tabuleiroObj.arrayCelulas[i][j];
					if(i<1 || j<=1 ||  i>=QUANT_CELULAS-50 ||  j>=QUANT_CELULAS-50){
						celula.dataset.type = "grass";
					}else if((j>2 && j<=7) &&  (i>=2 && i<=6)){
						celula.dataset.type = "floor";
					}else{
						celula.dataset.type = "ground";
					}
				}	
			}
			tabuleiroObj.arrayCelulas[2][3].appendChild(getParede('north'));
			tabuleiroObj.arrayCelulas[2][3].appendChild(getParede('west'));
			tabuleiroObj.arrayCelulas[3][3].appendChild(getParede('west'));
			tabuleiroObj.arrayCelulas[4][3].appendChild(getParede('west'));
			tabuleiroObj.arrayCelulas[5][3].appendChild(getParede('west'));
			tabuleiroObj.arrayCelulas[6][3].appendChild(getParede('west'));
			tabuleiroObj.arrayCelulas[6][3].appendChild(getParede('south'));
			tabuleiroObj.arrayCelulas[6][4].appendChild(getParede('south'));
			tabuleiroObj.arrayCelulas[6][5].appendChild(getParede('south'));
			tabuleiroObj.arrayCelulas[6][6].appendChild(getParede('south'));
			tabuleiroObj.arrayCelulas[6][7].appendChild(getParede('south'));
			tabuleiroObj.arrayCelulas[6][7].appendChild(getParede('east'));
			tabuleiroObj.arrayCelulas[5][7].appendChild(getParede('east'));
			tabuleiroObj.arrayCelulas[3][7].appendChild(getParede('east'));
			tabuleiroObj.arrayCelulas[2][7].appendChild(getParede('east'));
			tabuleiroObj.arrayCelulas[2][7].appendChild(getParede('north'));
			tabuleiroObj.arrayCelulas[2][6].appendChild(getParede('north'));
			tabuleiroObj.arrayCelulas[2][5].appendChild(getParede('north'));

			tabuleiroObj.arrayCelulas[3][9].appendChild(getParede('north'));
			tabuleiroObj.arrayCelulas[3][9].appendChild(getParede('south'));
			tabuleiroObj.arrayCelulas[3][9].appendChild(getParede('west'));
			tabuleiroObj.arrayCelulas[3][9].appendChild(getParede('east'));
			tabuleiroObj.arrayCelulas[3][9].dataset.type = "floor";

			// tabuleiroObj.arrayCelulas[10][10].appendChild(getParede('east'));
			// tabuleiroObj.arrayCelulas[10][11].appendChild(getParede('east'));
			// tabuleiroObj.arrayCelulas[11][10].appendChild(getParede('east'));
			// tabuleiroObj.arrayCelulas[10][12].appendChild(getParede('east'));
			// tabuleiroObj.arrayCelulas[10][9].appendChild(getParede('north'));
			// tabuleiroObj.arrayCelulas[10][11].appendChild(getParede('north'));
			// tabuleiroObj.arrayCelulas[10][12].appendChild(getParede('north'));
			// tabuleiroObj.arrayCelulas[9][12].appendChild(getParede('north'));
			// tabuleiroObj.arrayCelulas[12][12].appendChild(getParede('west'));
			// tabuleiroObj.arrayCelulas[11][12].appendChild(getParede('west'));
			// tabuleiroObj.arrayCelulas[11][11].appendChild(getParede('west'));
			// tabuleiroObj.arrayCelulas[13][11].appendChild(getParede('west'));
			// tabuleiroObj.arrayCelulas[14][11].appendChild(getParede('west'));
			// tabuleiroObj.arrayCelulas[15][11].appendChild(getParede('west'));
			// tabuleiroObj.arrayCelulas[16][11].appendChild(getParede('west'));
			// tabuleiroObj.arrayCelulas[17][11].appendChild(getParede('west'));
			// tabuleiroObj.arrayCelulas[11][13].appendChild(getParede('south'));
			// tabuleiroObj.arrayCelulas[11][9].appendChild(getParede('south'));
			// tabuleiroObj.arrayCelulas[9][9].appendChild(getParede('south'));
			// tabuleiroObj.arrayCelulas[12][9].appendChild(getParede('south'));

			for(let i = 0;i<QUANT_CELULAS;i++){
				tabuleiroObj.arrayCelulas[i][13].dataset.type = "street";
				tabuleiroObj.arrayCelulas[i][14].dataset.type = "street";
				tabuleiroObj.arrayCelulas[i][15].dataset.type = "street";
				tabuleiroObj.arrayCelulas[i][16].dataset.type = "street";
				tabuleiroObj.arrayCelulas[28][i].dataset.type = "street";
				tabuleiroObj.arrayCelulas[29][i].dataset.type = "street";
				tabuleiroObj.arrayCelulas[30][i].dataset.type = "street";
				tabuleiroObj.arrayCelulas[31][i].dataset.type = "street";
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


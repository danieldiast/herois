
		console.log('maker');

		var tabuleiroObj = null;

		class Tabuleiro {

			
		    constructor(sizeX,sizeY,tabuleiroHTML){
				this.percentualAtualTabSize = 100;
				this.sizeAtualTabuleiro = (tabSize[100]+OUTSIDE_BORDER_CELULA_ADD)*sizeX;
				this.moldeWidth = 600;
				this.moldeHeight = 600;
				this.arrayCelulas = [];
				this.tabuleiroHTML = tabuleiroHTML;


			    let sizeAtualCelula = tabSize[100]; //tamanho em px da celula quando zoom em 100%
				for(let i= 0;i<sizeY;i++){
					let linha = document.createElement("div");	
					linha.classList.add('linha');
					linha.dataset.coordX = i;
					linha.style.width = sizeAtualTabuleiro+"px";
					linha.style.height = sizeAtualCelula+"px";
					this.arrayCelulas[i] = [];
					for(var j= 0;j<sizeX ;j++){
						let celula = document.createElement("div");	
						celula.style.width = sizeAtualCelula+"px";
						celula.style.height = sizeAtualCelula+"px";
						celula.classList.add('celula');
						linha.appendChild(celula);	
						
						celula.dataset.coordX = j;
						celula.dataset.coordY = i;

						this.arrayCelulas[i][j]=celula;
					}
					tabuleiroHTML.appendChild(linha);	
				}

		    }

		}
		
		function iniciaTabuleiroNOVO() {
			tabuleiroObj = Tabuleiro(QUANT_CELULAS,QUANT_CELULAS,tabuleiro);
			
			tabuleiro.style.top = posAtualTabTop+"px";
			tabuleiro.style.left = posAtualTabLeft+"px";
			tabuleiro.style.width = sizeAtualTabuleiro+"px";
			tabuleiro.style.height = sizeAtualTabuleiro+"px";
			canvasTabuleiro.style.width = sizeAtualTabuleiro+"px";
			canvasTabuleiro.style.height = sizeAtualTabuleiro+"px";

			canvasTabuleiro.height = sizeAtualTabuleiro;
			canvasTabuleiro.width = sizeAtualTabuleiro;
		}


		//inicia tabuleiro
		function iniciaTabuleiro() {
			let sizeAtualCelula = tabSize[100]; //tamanho em px da celula quando zoom em 100%
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
					
					//	celula.dataset.type = "ground";


					arrayCelulas[i][j]=celula;
				}
				tabuleiro.appendChild(linha);	
			}
			
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

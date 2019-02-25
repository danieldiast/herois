
		console.log('inicio');

		// var arrayCelulas = [];

		var posAtualTabTop = -60;
		var posAtualTabLeft = -100;

		const QUANT_CELULAS = 100;
		const OUTSIDE_BORDER_CELULA_ADD = 0;
		// var percentualAtualTabSize = 100;
		// var sizeAtualTabuleiro = (tabSize[100]+OUTSIDE_BORDER_CELULA_ADD)*QUANT_CELULAS;
		// var moldeWidth = 600;
		// var moldeHeight = 600;
		const BORDER_MOLDE = 4;

		var selecionado;

		tabuleiro.addEventListener('contextmenu', event => event.preventDefault());
		tabuleiro.addEventListener('mouseover', mouseOverObjs);

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
					linha.style.width = this.sizeAtualTabuleiro+"px";
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

		    getCoordsCelula(celula){
				for(let y=0;y<  this.arrayCelulas.length; y++){
					for(let x=0;x<  this.arrayCelulas[y].length; x++){
						if(celula ==  this.arrayCelulas[y][x]){
							return {x, y};
						}
					}
				}
				return null;
			}

			getCelulaAcima(celula){
				let coords = this.getCoordsCelula(celula);
				if(coords != null && coords.y>0){
					return this.arrayCelulas[coords.y-1][coords.x];
				}
				return null;
			}

			getCelulaAbaixo(celula){
				let coords = this.getCoordsCelula(celula);
				if(coords != null && coords.y<this.arrayCelulas.length-1){
					return this.arrayCelulas[coords.y+1][coords.x];
				}
				return null;
			}

			getCelulaAEsquerda(celula){
				let coords = this.getCoordsCelula(celula);
				if(coords != null && coords.x>0){
					return this.arrayCelulas[coords.y][coords.x-1];
				}
				return null;
			}

			getCelulaADireita(celula){
				let coords = this.getCoordsCelula(celula);
				if(coords != null && coords.x<this.arrayCelulas[coords.y].length-1){
					return this.arrayCelulas[coords.y][coords.x+1];
				}
				return null;
			}

			getCelulaAcima2(celula){
				for(let y=0;y< arrayCelulas.length; y++){
					for(let x=0;x< arrayCelulas[y].length; x++){
						if(celula == arrayCelulas[y][x]){
							if(y>0){
								return arrayCelulas[y-1][x];
							} else{
								return null;
							}
						}
					}
				}
				return false;
			}



			// let celulaAbaixo = tabuleiroObj.getCelulaAcima(celula);
			// let celulaADireita = tabuleiroObj.getCelulaAcima(celula);
			// let celulaAEsquerda = tabuleiroObj.getCelulaAcima(celula);

		}

		document.querySelector("span.showGrid").addEventListener('click', e =>{
			if(e.target != showGrid){
				showGrid.checked = !showGrid.checked; // se não cliclou no box (clicou no texto), inverte o valor do box
			}
			if(showGrid.checked){
				tabuleiro.classList.add("grid");
			}else{
				tabuleiro.classList.remove("grid");
			}
		});

		zoomVal.addEventListener('click', e =>{
			// zoomVal.contentEditable = "true";
			zoomVal.style.display = "none";
			inputZoomVal.style.display = "unset";
			inputZoomVal.value = tabuleiroObj.percentualAtualTabSize;
			inputZoomVal.select();
			// inputZoomVal.setSelectionRange(0, inputZoomVal.value.length); // aparentemente, se Safari tem que ser assim

		});

		inputZoomVal.addEventListener("keydown", e =>{
			if (e.key === "Enter") { // ENTER event.keyCode === 13
				submitZoomVal();
			}
			if(e.key === "Escape") {
				disableEditingZoomVal();
			}
			if ('0123456789'.includes(event.key) == false) {
				e.preventDefault();
			}
		}, false);

		inputZoomVal.addEventListener("blur", submitZoomVal, false);

		function submitZoomVal(e){
			mudaPercentual(inputZoomVal.value);
			disableEditingZoomVal();
		}

		function disableEditingZoomVal(){
			zoomVal.style.display = "unset";
			inputZoomVal.style.display = "none";
		}


		sendChat.addEventListener("keydown", e =>{
			if(event.key === "Enter" && event.ctrlKey == false && event.shiftKey == false) { 
				submitChat();
				e.preventDefault();
			}
			if(event.key === "Escape") {
			}
		}, false);


		function submitChat(e){
			loga(sendChat.value);
			sendChat.value = "";
		}

		function loga(txt){
			let time = new Date();
			let log = "";
			let hour= time.getHours();
			if(hour<10){
				log+="0";
			}
			log+=hour;
			log+=":";
			let minutes=time.getMinutes();
			if(minutes<10){
				log+="0";
			}
			log+=minutes;
			log+=" - ";
			log+=txt;
			logs.innerHTML+=log+"<br />";

		}

		
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

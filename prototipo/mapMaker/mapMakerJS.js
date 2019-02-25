		console.log('maker');

			
		window.addEventListener("load", function(){
			MIN_PERCENTUAL_TAB = 8;
		});


		function iniciaTabuleiro() {
			tabuleiroObj = new Tabuleiro(QUANT_CELULAS,QUANT_CELULAS,tabuleiro);
			
			tabuleiro.style.top = posAtualTabTop+"px";
			tabuleiro.style.left = posAtualTabLeft+"px";
			tabuleiro.style.width = tabuleiroObj.sizeAtualTabuleiro+"px";
			tabuleiro.style.height = tabuleiroObj.sizeAtualTabuleiro+"px";
			canvasTabuleiro.style.width = tabuleiroObj.sizeAtualTabuleiro+"px";
			canvasTabuleiro.style.height = tabuleiroObj.sizeAtualTabuleiro+"px";

			canvasTabuleiro.height = tabuleiroObj.sizeAtualTabuleiro;
			canvasTabuleiro.width = tabuleiroObj.sizeAtualTabuleiro;
		}
		iniciaTabuleiro();


		pisos.addEventListener('click', function(e){
			let clicado = e.target;
			if(!clicado.classList.contains("celula")){
				return;
			}
			let selecionado = pisos.querySelector(".celula.selected")
			if(selecionado != null){
				selecionado.classList.remove("selected");
				if(selecionado == clicado){
					return;
				}
			}
			clicado.classList.add("selected");

		});

		bucket.addEventListener('click', function(e){
			bucket.classList.toggle("selected");
		});

		tabuleiro.addEventListener('mousedown', colocaPiso);
		tabuleiro.addEventListener('mousemove', colocaPiso);
		tabuleiro.addEventListener('mouseup', colocaPiso);

		class SelecaoColocarPiso {
		    constructor(celulaInicio,celulaFim){
		    	this.celulaInicio = celulaInicio;
		    	this.celulaFim = celulaFim;
		    	this.realizaSelecao = false;
		    }

		}

		var selecaoColocarPiso = null;

		function colocaPiso(e){
			e.preventDefault();  	
			let selecionado = pisos.querySelector(".selected");
			let celula = e.target;
			 //loga(e.buttons);
			
			if(e.buttons == 0){ // botao esquerdo (PRINCIPAL)
		    	
			}else if(e.buttons == 2){ //bot direito
				if(celula.classList.contains("celula") 
				&& selecionado != null){
					if(e.shiftKey){
						if(e.type == 'mousedown' || selecaoColocarPiso == null){
							selecaoColocarPiso = new SelecaoColocarPiso(celula,celula);
						}else if(e.type == 'mousemove'){
							selecaoColocarPiso.celulaFim = celula;
						}
					}else{
						selecaoColocarPiso = null;
						if(isBucketSelected()){
							colocaPisoBucket(celula, selecionado);
						}else{
							celula.dataset.type = selecionado.dataset.type;
						}
					}
				}
			}
			if(e.type == 'mouseup'){
				if(selecaoColocarPiso != null){
					selecaoColocarPiso.realizaSelecao = true;
				}
			}
			desenhaSelecaoPiso(selecaoColocarPiso);
			if(selecaoColocarPiso!= null && selecaoColocarPiso.realizaSelecao){		
				selecaoColocarPiso = null;
			}
			atualizaMiniTab();
		}

		function desenhaSelecaoPiso(selecaoColocarPiso){
			tabuleiro.querySelectorAll(".selectionColocaPiso").forEach(celula => {
				celula.classList.remove("selectionColocaPiso");
			});	
			if(selecaoColocarPiso == null){
				return;
			}
			let xInicio = parseInt(selecaoColocarPiso.celulaInicio.dataset.coordX);
			let xFim = parseInt(selecaoColocarPiso.celulaFim.dataset.coordX);
			let yInicio = parseInt(selecaoColocarPiso.celulaInicio.dataset.coordY);
			let yFim = parseInt(selecaoColocarPiso.celulaFim.dataset.coordY);
			if(xInicio>xFim){
				let aux= xFim;
				xFim = xInicio;
				xInicio = aux;
			}
			if(yInicio>yFim){
				let aux= yFim;
				yFim = yInicio;
				yInicio = aux;
			}
			for(let x=xInicio;x<=xFim;x++){
				for(let y=yInicio;y<=yFim;y++){
					if(selecaoColocarPiso.realizaSelecao){
						let selecionado = pisos.querySelector(".selected");
						tabuleiroObj.arrayCelulas[y][x].dataset.type = selecionado.dataset.type;
					}else{
						tabuleiroObj.arrayCelulas[y][x].classList.add("selectionColocaPiso");
					}
				}
			}

		}

		function isBucketSelected(){
			if(bucket.classList.contains("selected")){
				return true;
			}
			return false;
		}


		function colocaPisoBucket(celula, selecionado){
			if(celula == null){
				return;
			}
			let type = celula.dataset.type;
			if(type == selecionado.dataset.type){
				return;
			}
			celula.dataset.type = selecionado.dataset.type;
			// console.log("x"+celula.dataset.coordX+" y"+celula.dataset.coordY);
			let proximas = [];
			proximas.push(celula);
			while(proximas.length >0){
				celula = proximas.shift();
				let celulaAcima = tabuleiroObj.getCelulaAcima(celula);
				while(celulaAcima!=null && celulaAcima.dataset.type == type){
					celulaAcima.dataset.type = selecionado.dataset.type;
					proximas.push(celulaAcima);
					celulaAcima = tabuleiroObj.getCelulaAcima(celulaAcima);
				}
				let celulaAbaixo = tabuleiroObj.getCelulaAbaixo(celula);
				while(celulaAbaixo!=null && celulaAbaixo.dataset.type == type){
					celulaAbaixo.dataset.type = selecionado.dataset.type;
					proximas.push(celulaAbaixo);
					celulaAbaixo = tabuleiroObj.getCelulaAbaixo(celulaAbaixo);
				}
				let celulaADireita = tabuleiroObj.getCelulaADireita(celula);
				while(celulaADireita!=null && celulaADireita.dataset.type == type){
					celulaADireita.dataset.type = selecionado.dataset.type;
					proximas.push(celulaADireita);
					celulaADireita = tabuleiroObj.getCelulaADireita(celulaADireita);
				}
				let celulaAEsquerda = tabuleiroObj.getCelulaAEsquerda(celula);
				while(celulaAEsquerda!=null && celulaAEsquerda.dataset.type == type){
					celulaAEsquerda.dataset.type = selecionado.dataset.type;
					proximas.push(celulaAEsquerda);
					celulaAEsquerda = tabuleiroObj.getCelulaAEsquerda(celulaAEsquerda);
				}
			}

		}


		function colocaPisoBucket2(celula, selecionado){
			let type = celula.dataset.type;
			if(type == selecionado.dataset.type){
				return;
			}
			celula.dataset.type = selecionado.dataset.type;
			// console.log("x"+celula.dataset.coordX+" y"+celula.dataset.coordY);
			let celulaAcima = tabuleiroObj.getCelulaAcima(celula);
			if(celulaAcima!=null && celulaAcima.dataset.type == type){
				colocaPisoBucket(celulaAcima, selecionado);
			}
			let celulaAbaixo = tabuleiroObj.getCelulaAbaixo(celula);
			if(celulaAbaixo!=null && celulaAbaixo.dataset.type == type){
				colocaPisoBucket(celulaAbaixo, selecionado);
			}
			let celulaADireita = tabuleiroObj.getCelulaADireita(celula);
			if(celulaADireita!=null && celulaADireita.dataset.type == type){
				colocaPisoBucket(celulaADireita, selecionado);
			}
			let celulaAEsquerda = tabuleiroObj.getCelulaAEsquerda(celula);
			if(celulaAEsquerda!=null && celulaAEsquerda.dataset.type == type){
				colocaPisoBucket(celulaAEsquerda, selecionado);
			}


		}
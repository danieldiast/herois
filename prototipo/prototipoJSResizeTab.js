	

	tabuleiro.addEventListener('mousewheel', resizeTabuleiro, false);

	function resizeTabuleiro(e) {
		e.preventDefault();  
		clearInterval(desenhaMiraCanvasInterval);

		let celulaCentroResize = e.target;
		while(!celulaCentroResize.dataset.coordX){ //ate chegar na celula, caso haja algo dentro
			if(celulaCentroResize.parentNode == null){ //mal funcionamento que o obj fica sem pai
				console.error(celulaCentroResize);
			}
			celulaCentroResize = celulaCentroResize.parentNode;
			if(celulaCentroResize == tabuleiro){
				celulaCentroResize= null;
				break;
			}
		}
		resizeTabuleiro2(e, celulaCentroResize, e.offsetX, e.offsetY, getFactorResize(e));
	}

	function getFactorResize(e){
		var factor = 5;
		if(e.ctrlKey){
			factor = 1;
		}else if(e.shiftKey){
			factor = 15
		}
		if(e.type == 'mousewheel'){
			var y = e.deltaY;		
			if (y > 0) {
				factor = factor*-1;
			} 
			if (Math.abs(y) > 175) {
				factor = factor*2
			}
		}
		return factor;
	}


	function resizeTabuleiro2(e, celulaCentroResize, offsetXCelula, offsetYCelula, factor) {
		let distanceLeftMolde;
		let distanceTopMolde;
		
		let sizeAtualCelula = tabSize[tabuleiroObj.percentualAtualTabSize];
		if(celulaCentroResize!=null){
			distanceLeftMolde = (sizeAtualCelula * celulaCentroResize.dataset.coordX + posAtualTabLeft);
			distanceTopMolde = (sizeAtualCelula * celulaCentroResize.dataset.coordY + posAtualTabTop);
		}else{ //se não é celula, é o Pad (tamanho do Tabuleiro)
			distanceLeftMolde = offsetXCelula + posAtualTabLeft;
			distanceTopMolde = offsetYCelula + posAtualTabTop;
		}

		let sizeAntigoTabuleiro = tabuleiroObj.sizeAtualTabuleiro;

		newPercentual = tabuleiroObj.percentualAtualTabSize + factor;

		mudaPercentual(newPercentual);

		sizeAtualCelula = tabSize[tabuleiroObj.percentualAtualTabSize];
		if(celulaCentroResize!=null){
			posAtualTabTop =  (-1 * sizeAtualCelula * celulaCentroResize.dataset.coordY + distanceTopMolde);
			posAtualTabLeft = (-1 * sizeAtualCelula * celulaCentroResize.dataset.coordX + distanceLeftMolde);
		}else{ //se não é celula, é o Pad (tamanho do Tabuleiro)

			posAtualTabTop =  (-1 * (offsetYCelula * tabuleiroObj.sizeAtualTabuleiro / sizeAntigoTabuleiro) + distanceTopMolde);
			posAtualTabLeft = (-1 * (offsetXCelula * tabuleiroObj.sizeAtualTabuleiro / sizeAntigoTabuleiro) + distanceLeftMolde);
		}

		moveTabuleiroLimitaRange();
		
	};

	function mudaPercentual(newPercentual){
		
		if(isNaN(parseInt(newPercentual))){
			console.error("NaN", newPercentual);
			return;
		}

		newPercentual = Math.max(newPercentual, 10);
		newPercentual = Math.min(newPercentual, 200);

		tabuleiroObj.percentualAtualTabSize = newPercentual;

		let sizeAtualCelula = tabSize[tabuleiroObj.percentualAtualTabSize];
		tabuleiroObj.sizeAtualTabuleiro = ((sizeAtualCelula+OUTSIDE_BORDER_CELULA_ADD)*QUANT_CELULAS)
		zoomVal.innerHTML = tabuleiroObj.percentualAtualTabSize+"%";
		
		var celulas = tabuleiro.getElementsByClassName("celula");
		for(var i=0;i<celulas.length;i++){
			celulas[i].style.width = sizeAtualCelula + "px";
			celulas[i].style.height = sizeAtualCelula + "px";
		}
		var pecas = tabuleiro.getElementsByClassName("peca");
		for(var i=0;i<pecas.length;i++){
			pecas[i].style.width = sizeAtualCelula + "px";
			pecas[i].style.height = sizeAtualCelula + "px";
		}
		var linhas = tabuleiro.getElementsByClassName("linha")
		for(var i=0;i<linhas.length;i++){
			linhas[i].style.width = tabuleiroObj.sizeAtualTabuleiro + "px";
			linhas[i].style.height = sizeAtualCelula + "px";
		}


		tabuleiro.style.width = tabuleiroObj.sizeAtualTabuleiro + "px";
		tabuleiro.style.height = tabuleiroObj.sizeAtualTabuleiro + "px";
		var canvasTabuleiro = document.getElementById("canvasTabuleiro");
		canvasTabuleiro.style.width = tabuleiroObj.sizeAtualTabuleiro + "px";
		canvasTabuleiro.style.height = tabuleiroObj.sizeAtualTabuleiro + "px";
		pad.style.width = tabuleiroObj.sizeAtualTabuleiro + "px";
		pad.style.height = tabuleiroObj.sizeAtualTabuleiro + "px";



		canvasTabuleiro.height = tabuleiroObj.sizeAtualTabuleiro;
		canvasTabuleiro.width = tabuleiroObj.sizeAtualTabuleiro;
	}

	function changeTabuleiroTamanhoTotalIdeal(tamanhoIdeal){
		for(let i=10;i<=200;i++){
			if(tamanhoIdeal<=tabSize[i]*QUANT_CELULAS || i==200){
				mudaPercentual(i);
				return;
			}
		}
	}


	function getCelulaCentralizada(){
		var offsetMoldeX =  tabuleiroObj.moldeWidth/2;
		var offsetMoldeY = tabuleiroObj.moldeHeight/2;
		var x = Math.round(QUANT_CELULAS * (offsetMoldeX-posAtualTabLeft) / tabuleiroObj.sizeAtualTabuleiro);
		var y = Math.round(QUANT_CELULAS * (offsetMoldeY-posAtualTabTop) / tabuleiroObj.sizeAtualTabuleiro);
		return tabuleiroObj.arrayCelulas[y][x];
	}
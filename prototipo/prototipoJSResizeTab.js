	



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

		var y = e.deltaY;		
		if (y > 0) {
			factor = factor*-1;
		} 
		if (Math.abs(y) > 175) {
			factor = factor*2
		}

		return factor;
	}


	function resizeTabuleiro2(e, celulaCentroResize, offsetXCelula, offsetYCelula, factor) {
		let distanceLeftMolde;
		let distanceTopMolde;
		
		let sizeAtualCelula = tabSize[percentualAtualTabSize];
		if(celulaCentroResize!=null){
			distanceLeftMolde = (sizeAtualCelula * celulaCentroResize.dataset.coordX + posAtualTabLeft);
			distanceTopMolde = (sizeAtualCelula * celulaCentroResize.dataset.coordY + posAtualTabTop);
		}else{ //se não é celula, é o Pad (tamanho do Tabuleiro)
			distanceLeftMolde = offsetXCelula + posAtualTabLeft;
			distanceTopMolde = offsetYCelula + posAtualTabTop;
		}

		let sizeAntigoTabuleiro = sizeAtualTabuleiro;

		newPercentual = percentualAtualTabSize + factor;
		newPercentual = Math.max(newPercentual, 10);
		newPercentual = Math.min(newPercentual, 200);

		mudaPercentual(newPercentual);

		sizeAtualCelula = tabSize[percentualAtualTabSize];
		if(celulaCentroResize!=null){
			posAtualTabTop =  (-1 * sizeAtualCelula * celulaCentroResize.dataset.coordY + distanceTopMolde);
			posAtualTabLeft = (-1 * sizeAtualCelula * celulaCentroResize.dataset.coordX + distanceLeftMolde);
		}else{ //se não é celula, é o Pad (tamanho do Tabuleiro)

			posAtualTabTop =  (-1 * (offsetYCelula * sizeAtualTabuleiro / sizeAntigoTabuleiro) + distanceTopMolde);
			posAtualTabLeft = (-1 * (offsetXCelula * sizeAtualTabuleiro / sizeAntigoTabuleiro) + distanceLeftMolde);
		}

		moveTabuleiroLimitaRange();
		
	};

	function mudaPercentual(newPercentual){

		percentualAtualTabSize = newPercentual;

		let sizeAtualCelula = tabSize[percentualAtualTabSize];
		sizeAtualTabuleiro = ((sizeAtualCelula+OUTSIDE_BORDER_CELULA_ADD)*QUANT_CELULAS)
		zoomVal.innerHTML = percentualAtualTabSize+"%";
		
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
		pad.style.width = sizeAtualTabuleiro + "px";
		pad.style.height = sizeAtualTabuleiro + "px";



		canvasTabuleiro.height = sizeAtualTabuleiro;
		canvasTabuleiro.width = sizeAtualTabuleiro;
	}

	function changeTabuleiroTamanhoTotalIdeal(tamanhoIdeal){
		for(let i=10;i<=200;i++){
			if(tamanhoIdeal<=tabSize[i]*QUANT_CELULAS || i==200){
				mudaPercentual(i);
				return;
			}
		}
	}
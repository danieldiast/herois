	



	tabuleiro.addEventListener('mousewheel', resizeTabuleiro, false);

	function resizeTabuleiro(e) {
		console.log('resizeTabuleiro');
		console.log(e.target);

		let celulaCentroResize = e.target;
		while(!celulaCentroResize.dataset.coordX){ //ate chegar na celula, caso haja algo dentro
			if(celulaCentroResize.parentNode == null){ //mal funcionamento que o obj fica sem pai
				console.error(celulaCentroResize);
			}
			celulaCentroResize = celulaCentroResize.parentNode;
			if(celulaCentroResize == tabuleiro){
				return;
			}
		}
		
		let sizeAtualCelula = tabSize[percentualAtualTabSize];
		let distanceLeftMolde = (sizeAtualCelula * celulaCentroResize.dataset.coordX + posAtualTabLeft);
		let distanceTopMolde = (sizeAtualCelula * celulaCentroResize.dataset.coordY + posAtualTabTop);
		console.log("tabuleiro.style.width > "+sizeAtualTabuleiro);
		console.log("distanceWidth > "+distanceLeftMolde);
		console.log("distanceHeight > "+distanceTopMolde);

		e.preventDefault();  	
		var y = event.deltaY;
		var factor = 5;
		if(e.ctrlKey){
			factor = 1;
		}else if(e.shiftKey){
			factor = 15
		}
		if (y > 0) {
			newPercentual = Math.max(percentualAtualTabSize - factor, 10);
		} else {
			newPercentual = Math.min(percentualAtualTabSize + factor, 200);
		}
		console.log(newPercentual);
		mudaPercentual(newPercentual);

		sizeAtualCelula = tabSize[percentualAtualTabSize];
		posAtualTabTop =  (-1 * sizeAtualCelula * celulaCentroResize.dataset.coordY + distanceTopMolde);
		posAtualTabLeft = (-1 * sizeAtualCelula * celulaCentroResize.dataset.coordX + distanceLeftMolde);

		console.log("posAtualTabTop > "+posAtualTabTop);
		console.log("posAtualTabLeft > "+posAtualTabLeft);

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

		canvasTabuleiro.height = sizeAtualTabuleiro;
		canvasTabuleiro.width = sizeAtualTabuleiro;
	}

	function changeTabuleiroTamanhoTotalIdeal(tamanhoIdeal){
		console.log("entrou changeTabuleiroTamanhoTotalIdeal")
		for(let i=10;i<=200;i++){
			if(tamanhoIdeal<=tabSize[i]*QUANT_CELULAS || i==200){
				console.log("newPercentual",i)
				mudaPercentual(i);
				return;
			}
		}
	}
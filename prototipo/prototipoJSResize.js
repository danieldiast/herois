	



	tabuleiro.addEventListener('mousewheel', resizeTabuleiro, false);

	function resizeTabuleiro(e) {
		console.log('resizeTabuleiro');
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
		percentualAtualTabSize = newPercentual;
		let sizeAtualCelula = tabSize[percentualAtualTabSize];
		sizeAtualTabuleiro = ((sizeAtualCelula+OUTSIDE_BORDER_CELULA_ADD)*QUANT_CELULAS)
		
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
		console.log('maker');

			
		window.addEventListener("load", function(){
			MIN_PERCENTUAL_TAB = 5;
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
			let selecionado = pisos.querySelector(".selected")
			if(selecionado != null){
				selecionado.classList.remove("selected");
				if(selecionado == clicado){
					return;
				}
			}
			clicado.classList.add("selected");

		});

		tabuleiro.addEventListener('mousedown', function(e){
			e.preventDefault();  	
			let selecionado = pisos.querySelector(".selected");
			let celula = e.target;
			loga(e.button);
			
			if(e.button == 0){ // botao esquerdo (PRINCIPAL)
		    	
			}else if(e.button == 2){ //bot direito
				if(celula.classList.contains("celula") 
				&& selecionado != null){
					celula.dataset.type = selecionado.dataset.type;
					atualizaMiniTab();

				}
			}

		});
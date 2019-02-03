
		
		tabuleiro.addEventListener('mousedown', mouseDownMoveTabuleiro, false);

		window.addEventListener('mouseup', mouseUpMoveTabuleiro, false);

		var justMoved = false;
		function mouseUpMoveTabuleiro() {
		    window.removeEventListener('mousemove', moveTabuleiro, true);
			avisos.innerHTML = "";		
			tabuleiro.style.cursor = "default";	
			justMoved = false;
		}

		

		function mouseDownMoveTabuleiro(e) {
			if(e.button == 0){
		    	window.addEventListener('mousemove', moveTabuleiro, true);
				avisos.innerHTML = "CTRL: mais devagar - SHIFT: mais rápido";
				tabuleiro.style.cursor = "move";
			}else if(e.button == 2){
				e.preventDefault();  	
				if(e.target.classList.contains("celula")){
					avisos.innerHTML = e.target.dataset.coordX+" - "+e.target.dataset.coordY;

				}
			}
		}

		function moveTabuleiro(e) {
			console.log('moveTabuleiro');
			var tabuleiro = document.getElementById("tabuleiro");
			if(e.ctrlKey){
				if(e.movementY>1)posAtualTabTop+=1;
				if(e.movementY<0)posAtualTabTop-=1;
				if(e.movementX>1)posAtualTabLeft+=1;
				if(e.movementX<0)posAtualTabLeft-=1;
			}else if(e.shiftKey){
				posAtualTabTop+=e.movementY*10;
				posAtualTabLeft+=e.movementX*10;

			} else{
				posAtualTabTop+=e.movementY;
				posAtualTabLeft+=e.movementX;
			}
			moveTabuleiroLimitaRange();
			justMoved = true;
		};

		function moveTabuleiroLimitaRange(){
			const ESPACO_EXTRA= 100;
			if(posAtualTabTop < -sizeAtualTabuleiro + moldeHeight - ESPACO_EXTRA){
				posAtualTabTop = -sizeAtualTabuleiro + moldeHeight - ESPACO_EXTRA;
			}
			if(posAtualTabLeft < -sizeAtualTabuleiro + moldeWidth - ESPACO_EXTRA){
				posAtualTabLeft = -sizeAtualTabuleiro + moldeWidth - ESPACO_EXTRA;
			}
			if(posAtualTabLeft < -sizeAtualTabuleiro + moldeWidth - ESPACO_EXTRA){
				posAtualTabLeft = -sizeAtualTabuleiro + moldeWidth - ESPACO_EXTRA;
			}
			if(posAtualTabLeft > ESPACO_EXTRA){
				posAtualTabLeft = ESPACO_EXTRA;
			}
			if(posAtualTabTop > ESPACO_EXTRA){
				posAtualTabTop = ESPACO_EXTRA;
			}
		    tabuleiro.style.top = posAtualTabTop+"px";
		    tabuleiro.style.left = posAtualTabLeft+"px";
		    atualizaMiniTab();
		}


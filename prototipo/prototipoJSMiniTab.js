		console.log('canvasMiniTab');
		const SIZE_MT = 202; // MT = MiniTab


		var ctxMT = canvasMiniTab.getContext('2d');
		var canvasMTData = ctxMT.getImageData(0, 0, SIZE_MT, SIZE_MT);


		canvasMiniTab.style.width = SIZE_MT+"px";
		canvasMiniTab.style.height = SIZE_MT+"px";

		canvasMiniTab.height = SIZE_MT;
		canvasMiniTab.width = SIZE_MT;

		//event de mouse move
		function limpaCanvasMT(){
			ctxMT.clearRect(0,0,SIZE_MT,SIZE_MT);
		}


		function atualizaMiniTab(){
			limpaCanvasMT();
			// console.log("atualizaMiniTab");
		    ctxMT.fillStyle = 'orange';
		    ctxMT.lineWidth = 1;
		    ctxMT.beginPath();

			for(let i= 0; i<(QUANT_CELULAS); i++){
				for(let j=0;j<(QUANT_CELULAS);j++){
					let celula = tabuleiroObj.arrayCelulas[j][i];

					switch(celula.dataset.type){
						case 'grass':
	    					ctxMT.fillStyle = 'lightgreen';
	    					break;
						case 'floor':
	    					ctxMT.fillStyle = 'white';
	    					break;
						case 'street':
	    					ctxMT.fillStyle = 'lightgray';
	    					break;
						case 'ground':
	    					ctxMT.fillStyle = 'lightyellow';
	    					break;
						default:
	    					ctxMT.fillStyle = 'white';
	    					break;
					}
					ctxMT.fillRect(i*2+1,j*2+1,2,2);

					if(i%2 == 0 && j%2 == 1||
					   j%2 == 0 && i%2 == 1){
	    				ctxMT.fillStyle = 'rgba(204,204,204,0.2)';
						ctxMT.fillRect(i*2+1,j*2+1,2,2);
					}

					let paredes = celula.querySelectorAll(".parede")
					desenhaParedes(paredes,i,j);

					if(celula.querySelector(".item") != null){
		    			ctxMT.fillStyle = 'black';
						ctxMT.fillRect(i*2+1,j*2+1,2,2);

					}

					if(celula.querySelector(".scenario") != null){
						fillRectCelula(i,j,'green');
					}


					if(celula.querySelector(".vehi") != null){
		    			ctxMT.fillStyle = 'purple'; 
						ctxMT.fillRect(i*2+1,j*2+1,2,2);

					}

					peca = celula.querySelector(".peca");
					if(peca != null){
		    			ctxMT.fillStyle = '#E7A303'; // dark yellow
		    			if(peca.classList.contains("selected")){
		    				ctxMT.fillStyle = '#8D0244';  //dark purple
		    			}
						ctxMT.fillRect(i*2+1,j*2+1,2,2);
					}
					if(celula.classList.contains("caminhoParcial")){
						fillRectCelula(i,j,'#8baee8');
					}
					if(celula.classList.contains("caminhoSimulado")){
						fillRectCelula(i,j,'blue');
					}
					if(celula.classList.contains("caminhoMira")){
						fillRectCelula(i,j,'rgba(255,0,0,0.4)');
					}

				}
			}

			let mtMoldeHeight = Math.round(tabuleiroObj.moldeHeight * SIZE_MT / tabuleiroObj.sizeAtualTabuleiro);
			let mtMoldeWidth = Math.round(tabuleiroObj.moldeWidth * SIZE_MT / tabuleiroObj.sizeAtualTabuleiro);

			let mtTop = Math.round(posAtualTabTop / tabuleiroObj.sizeAtualTabuleiro * SIZE_MT *-1 );
			let mtLeft = Math.round(posAtualTabLeft / tabuleiroObj.sizeAtualTabuleiro  * SIZE_MT *-1);
			
		    ctxMT.strokeStyle = 'red';
		    ctxMT.lineWidth = 1;

		    // faz o contorno vermelho na visão, não deixando exceder os limites do molde do minitab

		    let widthContorno = Math.min(mtMoldeWidth,(SIZE_MT-Math.abs(mtLeft)))
		    if(mtLeft < 0){
		    	widthContorno += mtLeft; //ra verdade subtrai, pois é nagativo
		    	mtLeft = 0;
		    }
		    let heightContorno = Math.min(mtMoldeHeight,(SIZE_MT-Math.abs(mtTop)))
		    if(mtTop < 0){
		    	heightContorno += mtTop;
		    	mtTop = 0;
		    }
			ctxMT.strokeRect(mtLeft, mtTop, widthContorno, heightContorno);

		}

		atualizaMiniTab();

		function desenhaParedes(paredes,i,j){
			if(paredes.length > 0){
    			ctxMT.fillStyle = 'brown';
				paredes.forEach(parede => {
					if(parede.classList.contains("north")){
						ctxMT.fillRect(i*2+1,j*2+1,2,1);
					}
					if(parede.classList.contains("south")){
						ctxMT.fillRect(i*2+2,j*2+2,2,1);
					}
					if(parede.classList.contains("west")){
						ctxMT.fillRect(i*2+1,j*2+1,1,2);
					}
					if(parede.classList.contains("east")){
						ctxMT.fillRect(i*2+2,j*2+2,1,2);
					}
				});
			}
		}

		function fillRectCelula(i,j, color){
			ctxMT.fillStyle = color;
			ctxMT.fillRect(i*2+1,j*2+1,2,2);
		}


		canvasMiniTab.addEventListener('contextmenu', event => event.preventDefault());

		controlTab.addEventListener('contextmenu', event => event.preventDefault());
		
		canvasMiniTab.addEventListener('mousedown', mouseDownMiniTab, false);

		canvasMiniTab.addEventListener('mousewheel', resizeMiniTab, false);
		controleDirecionais.addEventListener('mousewheel', resizeMiniTab, false);
		zoom_mais.addEventListener('mousewheel', resizeMiniTab, false);
		zoom_menos.addEventListener('mousewheel', resizeMiniTab, false);
		zoomVal.addEventListener('mousewheel', resizeMiniTab, false);

		zoom_mais.addEventListener('mousedown', mousedownZoom, false);
		zoom_menos.addEventListener('mousedown', mousedownZoom, false);

		controleDirecionais.addEventListener('mousedown', ativaMoveTabDirecionais, false);
		
		window.addEventListener('mouseup', mouseUpMiniTab, false);

		function mouseUpMiniTab(e) {
			clearInterval(zoomInterval);	
			clearInterval(moveTabDirecionaisInterval);	
			
			controleDirecionais.removeEventListener('mousemove', moveTabDirecionais, false);
		    canvasMiniTab.removeEventListener('mousemove', moveMiniTab, true);

		    if(constroindoMoldeMiniTab){		    	
				constroindoMoldeMiniTab = false;
		    	canvasMiniTab.removeEventListener('mousemove', constroiMoldeMiniTab, true);
		    	executaNovoMoldeMT();
		    }

			controleDirecionais.classList.remove("intense");
			controleDirecionais.classList.remove("right");
			controleDirecionais.classList.remove("left");
			controleDirecionais.classList.remove("down");
			controleDirecionais.classList.remove("up");
		}


		let zoomInterval;
		function mousedownZoom(e){
			resizeMiniTab(e);
			zoomInterval = setInterval(event => {resizeMiniTab(e)}, 100);
		}

		function resizeMiniTab(e){
			e.preventDefault();
			let offsetXCelula = tabSize[tabuleiroObj.percentualAtualTabSize]/2;
			let offsetYCelula = tabSize[tabuleiroObj.percentualAtualTabSize]/2;
			var factor = getFactorResize(e);
			if(e.target == zoom_menos){
				factor = -factor;
			}
			resizeTabuleiro2(e, getCelulaCentralizada(), offsetXCelula, offsetYCelula, factor);
		}


		function ativaMoveTabDirecionais(e){
			controleDirecionais.addEventListener('mousemove', moveTabDirecionais, false);
			moveTabDirecionais(e);
		}

		let moveTabDirecionaisInterval;
		function moveTabDirecionais(e){
			clearInterval(moveTabDirecionaisInterval);	
			controleDirecionais.classList.remove("intense");
			controleDirecionais.classList.remove("right");
			controleDirecionais.classList.remove("left");
			controleDirecionais.classList.remove("down");
			controleDirecionais.classList.remove("up");

			const SIZE_DIREC = controleDirecionais.offsetWidth;
			const PERCENT_DIREC = SIZE_DIREC/100;
			const CENTRO_DIREC = SIZE_DIREC/2;
			let moveDireita = 0;
			let moveBaixo = 0;
			let moveFactor = tabSize[tabuleiroObj.percentualAtualTabSize]/4;

			if(e.offsetX > PERCENT_DIREC*60){
				moveDireita = -moveFactor;
				controleDirecionais.classList.add("right");
			}else if(e.offsetX <  PERCENT_DIREC*40){
				moveDireita = moveFactor;
				controleDirecionais.classList.add("left");
			}
			if(e.offsetX < PERCENT_DIREC*15 || e.offsetX > PERCENT_DIREC*85){
				moveDireita *= 2;
				controleDirecionais.classList.add("intense");
			}

			if(e.offsetY > PERCENT_DIREC*60){
				moveBaixo = -moveFactor;
				controleDirecionais.classList.add("down");
			}else if(e.offsetY < PERCENT_DIREC*40){
				moveBaixo = moveFactor;
				controleDirecionais.classList.add("up");
			}
			if(e.offsetY < PERCENT_DIREC*15 || e.offsetY > PERCENT_DIREC*85){
				moveBaixo *= 2;
				controleDirecionais.classList.add("intense");
			}

			posAtualTabLeft = posAtualTabLeft + moveDireita;
			posAtualTabTop = posAtualTabTop + moveBaixo;
			moveTabuleiroLimitaRange();

			moveTabDirecionaisInterval = setInterval(() => {

				posAtualTabLeft = posAtualTabLeft + moveDireita;
				posAtualTabTop = posAtualTabTop + moveBaixo;
				moveTabuleiroLimitaRange();
			}, 50);
		}
    
		function mouseDownMiniTab(e) {
			if(e.button == 0){ // botao esquerdo
				canvasMiniTab.addEventListener('mousemove', moveMiniTab, true);
				moveMiniTab(e);

			}else if(e.button == 2){ // botao direito
				origemLeft = e.offsetX;
				origemTop = e.offsetY;
				canvasMiniTab.addEventListener('mousemove', constroiMoldeMiniTab, true);
			}
		}



		function moveMiniTab(e) {
			if(e.button == 0){ // botao esquerdo
				let clickLeft = e.offsetX;
				let clickTop = e.offsetY;

				avisos.innerHTML = "Minimap X: "+clickLeft;
				avisos.innerHTML += "<br/>Minimap Y: "+clickTop;


				let mtMoldeHeight = Math.round(tabuleiroObj.moldeHeight * SIZE_MT / tabuleiroObj.sizeAtualTabuleiro);
				let mtMoldeWidth = Math.round(tabuleiroObj.moldeWidth * SIZE_MT / tabuleiroObj.sizeAtualTabuleiro);

				let disvioLeft = e.offsetX - mtMoldeWidth/2;
				let desvioTop = e.offsetY - mtMoldeHeight/2;

				posAtualTabTop = Math.round(desvioTop * tabuleiroObj.sizeAtualTabuleiro / SIZE_MT  *-1 )
				posAtualTabLeft = Math.round(disvioLeft * tabuleiroObj.sizeAtualTabuleiro / SIZE_MT  *-1 )


				moveTabuleiroLimitaRange();


			}else if(e.button == 2){ // botao direito
				//e.preventDefault();  	
			}
		}

		function executaNovoMoldeMT(){
			//inver origens se for o caso
			if(sizeLateral < 0){
				sizeLateral = -sizeLateral;
				origemLeft -= sizeLateral;
			}
			if(sizeVertical < 0){
				sizeVertical = -sizeVertical;
				origemTop -= sizeVertical;
			}


			let  idealSizeAtualTabuleiro = Math.round(tabuleiroObj.moldeWidth * SIZE_MT / sizeLateral);
			idealSizeAtualTabuleiro = Math.round(tabuleiroObj.moldeHeight * SIZE_MT / sizeVertical);// por enquanto está redundante, pois tabuleiro é sempre quadrado

			changeTabuleiroTamanhoTotalIdeal(idealSizeAtualTabuleiro);

			posAtualTabTop = Math.round(origemTop * tabuleiroObj.sizeAtualTabuleiro / SIZE_MT  *-1 )
			posAtualTabLeft = Math.round(origemLeft * tabuleiroObj.sizeAtualTabuleiro / SIZE_MT  *-1 )

			moveTabuleiroLimitaRange();

		}


		let origemLeft = 0;
		let origemTop = 0;
		let sizeLateral = 0;
		let sizeVertical = 0;
		let constroindoMoldeMiniTab = false;
		function constroiMoldeMiniTab(e) {
			constroindoMoldeMiniTab = true;
			moveTabuleiroLimitaRange();
			let destinoLeft = e.offsetX;
			let destinoTop = e.offsetY;

			let razaoMoldeW_H = tabuleiroObj.moldeWidth / tabuleiroObj.moldeHeight;
			let razaoMoldeH_W = tabuleiroObj.moldeHeight / tabuleiroObj.moldeWidth;
		
			sizeLateral = origemLeft - destinoLeft;
			sizeVertical = origemTop - destinoTop;
			if(Math.abs(sizeVertical)>Math.abs(sizeLateral)){
				sizeLateral = -razaoMoldeW_H*Math.abs(sizeVertical)*Math.sign(sizeLateral);
				sizeVertical = -sizeVertical;
			}else{
				sizeVertical = -razaoMoldeH_W*Math.abs(sizeLateral)*Math.sign(sizeVertical);
				sizeLateral = -sizeLateral;
			}

			ctxMT.beginPath();
			ctxMT.strokeStyle = 'yellow';
		    ctxMT.lineWidth = 4;

			ctxMT.strokeRect(origemLeft,origemTop,
							sizeLateral, 
							sizeVertical);

		}



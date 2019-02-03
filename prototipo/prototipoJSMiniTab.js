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
			console.log("atualizaMiniTab");
		    ctxMT.fillStyle = 'orange';
		    ctxMT.lineWidth = 1;
		    ctxMT.beginPath();

			for(let i= 0; i<(QUANT_CELULAS); i++){
				for(let j=0;j<(QUANT_CELULAS);j++){


					if(i%2 == 0 && j%2 == 1||
					   j%2 == 0 && i%2 == 1){
	    				ctxMT.fillStyle = '#ccc';
						ctxMT.fillRect(i*2+1,j*2+1,2,2);
					}

					let celula = arrayCelulas[j][i];
					let paredes = celula.querySelectorAll(".parede")
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
					peca = celula.querySelector(".peca");
					if(peca != null){
						//console.log("PECA x="+celula.dataset.coordX, "y="+celula.dataset.coordY);
		    			ctxMT.fillStyle = 'blue';
						ctxMT.fillRect(i*2+1,j*2+1,2,2);
					}

				}
			}

			let mtMoldeHeight = Math.round(moldeHeight * SIZE_MT / sizeAtualTabuleiro);
			let mtMoldeWidth = Math.round(moldeWidth * SIZE_MT / sizeAtualTabuleiro);

			let mtTop = Math.round(posAtualTabTop / sizeAtualTabuleiro * SIZE_MT *-1 );
			let mtLeft = Math.round(posAtualTabLeft / sizeAtualTabuleiro  * SIZE_MT *-1);
			
			console.log("sizeAtualTabuleiro",sizeAtualTabuleiro);
			console.log("mtMoldeHeight",mtMoldeHeight,"mtMoldeWidth",mtMoldeWidth);
			console.log("posAtualTabTop / sizeAtualTabuleiro",posAtualTabTop / sizeAtualTabuleiro, "posAtualTabLeft / sizeAtualTabuleiro",posAtualTabLeft / sizeAtualTabuleiro);
			console.log("posAtualTabTop",posAtualTabTop, "posAtualTabLeft",posAtualTabLeft);

			console.log("mtTop",mtTop);
			console.log("mtTop",mtLeft);

		    ctxMT.strokeStyle = 'red';
		    ctxMT.strokeWidth = 1;

			ctxMT.strokeRect(Math.max(mtLeft,0), Math.max(mtTop,0),
							Math.min(mtMoldeHeight,SIZE_MT), Math.min(mtMoldeWidth,SIZE_MT));

		}

		function drawPixel (x, y, r, g, b, a) {
		    var index = (x + y * SIZE_MT) * 4;

		    canvasMTData.data[index + 0] = r;
		    canvasMTData.data[index + 1] = g;
		    canvasMTData.data[index + 2] = b;
		    canvasMTData.data[index + 3] = a;
		}

		atualizaMiniTab();


		canvasMiniTab.addEventListener('contextmenu', event => event.preventDefault());
		
		canvasMiniTab.addEventListener('mousedown', mouseDownMiniTab, false);
		
		//window.addEventListener('mouseup', mouseUpMoveTabuleiro, false);

		function mouseDownMiniTab(e) {
			if(e.button == 0){ // botao esquerdo
				avisos.innerHTML = "Minimap X: "+e.offsetX;
				avisos.innerHTML += "<br/>Minimap Y: "+e.offsetY;
			}else if(e.button == 2){ // botao direito
				e.preventDefault();  	
			}
		}


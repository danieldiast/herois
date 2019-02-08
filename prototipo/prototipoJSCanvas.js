
		console.log('canvas');
		var ctx = canvasTabuleiro.getContext('2d');

		//event de mouse move
		function limpaCanvas(){
			ctx.clearRect(0,0,sizeAtualTabuleiro,sizeAtualTabuleiro);
		}


		let desenhaMiraCanvasInterval = null;
		function mirar(e){ // entra no Tab e nas celular
				clearInterval(desenhaMiraCanvasInterval);
				removeClassSelection(".naMira","naMira");
				removeClassSelection(".caminhoMira", "caminhoMira")
				Array.from(tabuleiro.getElementsByClassName('percentPassagem')).forEach(span => {
		    		span.parentElement.removeChild(span);
		    	})	;
				// if(!e.target.classList.contains("tabuleiro")){return}
				let celulaDestino = e.target;
				 while(!celulaDestino.classList.contains("celula")){
				 	celulaDestino = celulaDestino.parentElement;
				 	if(celulaDestino == tabuleiro){
				 		console.error("mirar com target não filho de celula ",e.target)
				 		return;
				 	}
				 }
				let destinoOffsetX = e.offsetX + (celulaDestino.dataset.coordX * tabSize[percentualAtualTabSize]);
				let destinoOffsetY = e.offsetY + (celulaDestino.dataset.coordY * tabSize[percentualAtualTabSize]);
				
				 // ctx.fillRect(0,0,250,200);
				var selecionado = document.querySelector('.peca.selected');
				if(!selecionado) return;
				let celulaOrigem = selecionado.parentElement;


				let caminhoDeMira = tracaCaminhoDeMiraPorHipotenusa(celulaOrigem,celulaDestino);
				let alvoNaMira = null;
				let celulaAnterior = null;
				for(let i=0;i<caminhoDeMira.length;i++){
				 	let celula = caminhoDeMira[i][0];
					// paredes: 'simples', se tem na ida ou na volta, as acerta, se não, passa reto
					if(i>0){
						celulaAnterior = caminhoDeMira[i-1][0];
					}

				 	let direcaoIndo1 = direcaoUmParaOutro(celulaAnterior,celula);
			 		let paredes = [], paredesEs, paredesNo, paredesWe, paredesSo;
				 	switch(direcaoIndo1){
				 		case "up":
				 			paredes = Array.from(celula.querySelectorAll(".parede.south"));
		 					break;
				 		case "down":
				 			paredes = Array.from(celula.querySelectorAll(".parede.north"));
		 					break;
				 		case "left":
				 			paredes = Array.from(celula.querySelectorAll(".parede.east"));
		 					break;
				 		case "right":
				 			paredes = Array.from(celula.querySelectorAll(".parede.west"));
		 					break;
		 				case "right-up":
				 			paredesWe = Array.from(celula.querySelectorAll(".parede.west"));
				 			paredesSo =  Array.from(celula.querySelectorAll(".parede.south"));
				 			if(paredesWe.length > 0 && paredesSo.length >0){
				 				paredes= paredes.concat(paredesWe);
				 				paredes= paredes.concat(paredesSo);
				 			}else if(paredesWe.length > 0){
				 				if(temParedeEmBaixo(celula,".west")){
				 					paredes= paredes.concat(paredesWe);
				 				}
				 			}else if(paredesSo.length > 0){
				 				if(temParedeAEsquerda(celula,".south")){
				 					paredes= paredes.concat(paredesSo);
				 				}
				 			}
		 					break;
		 				case "right-down":
		 					paredesWe = Array.from(celula.querySelectorAll(".parede.west"));
				 			paredesNo =  Array.from(celula.querySelectorAll(".parede.north"));
				 			if(paredesWe.length > 0 && paredesNo.length >0){
				 				paredes= paredes.concat(paredesWe);
				 				paredes= paredes.concat(paredesNo);
				 			}else if(paredesWe.length > 0){
				 				if(temParedeEmCima(celula,".west")){
				 					paredes= paredes.concat(paredesWe);
				 				}
				 			}else if(paredesNo.length > 0){
				 				if(temParedeAEsquerda(celula,".north")){
				 					paredes= paredes.concat(paredesNo);
				 				}
				 			}
		 					break;
		 				case "left-up":
		 					paredesEs = Array.from(celula.querySelectorAll(".parede.east"));
				 			paredesSo =  Array.from(celula.querySelectorAll(".parede.south"));
				 			if(paredesEs.length > 0 && paredesSo.length >0){
				 				paredes= paredes.concat(paredesEs);
				 				paredes= paredes.concat(paredesSo);
				 			}else if(paredesEs.length > 0){
				 				if(temParedeEmBaixo(celula,".west")){
				 					paredes= paredes.concat(paredesEs);
				 				}
				 			}else if(paredesSo.length > 0){
				 				if(temParedeADireita(celula,".south")){
				 					paredes= paredes.concat(paredesSo);
				 				}
				 			}
		 					break;
		 				case "left-down":
		 					paredesEs = Array.from(celula.querySelectorAll(".parede.east"));
				 			paredesNo =  Array.from(celula.querySelectorAll(".parede.north"));
				 			if(paredesEs.length > 0 && paredesNo.length >0){
				 				paredes= paredes.concat(paredesEs);
				 				paredes= paredes.concat(paredesSo);
				 			}else if(paredesEs.length > 0){
				 				if(temParedeEmBaixo(celula,".west")){
				 					paredes= paredes.concat(paredesEs);
				 				}
				 			}else if(paredesNo.length > 0){
				 				if(temParedeADireita(celula,".north")){
				 					paredes= paredes.concat(paredesNo);
				 				}
				 			}
		 					break;
				 	}
		 			if(paredes.length > 0){
		 				paredes.forEach(parede => {
		 					parede.classList.add("naMira");
		 				});
		 				alvoNaMira = celula;
			 			break;
		 			}

				 	celula.classList.add("caminhoMira");
		 			if(i>0){
						let spanPercent = document.createElement("span");	
						spanPercent.classList.add('percentPassagem');
						diffHip = caminhoDeMira[i][1];
						let percent = 100 * (300-diffHip) / 300;
						spanPercent.innerHTML = percent.toFixed(0)+"%";
						celula.appendChild(spanPercent);
						celulaAnterior = caminhoDeMira[i-1][0];
					}


				 	// padroes: mosca - leve - medio - pesado - pesadissimo - ultrapesado - monstro
					//se diff <= 40 = acerta mosca+
					//se diff <= 45 = acerta leve+
					//se diff <= 50 = acerta medio+
					//se diff <= 60 = acerta pesado+
					//se diff <= 70 = acerta pesadissimo+
					//se diff <= 85 = acerta ultrapesado+
					//se diff <= 100 = acerta monstro+
					let peca = celula.querySelector('.peca');
					if(peca != null && celula != celulaOrigem){
						if(caminhoDeMira[i][1]<=50){
			 				peca.classList.add("naMira");
			 				celula.classList.add("naMira");
		 					alvoNaMira = celula;
			 				break;
						}
					}

					if(i<caminhoDeMira.length-1){
					 	let direcaoIndo2 = direcaoUmParaOutro(celula, caminhoDeMira[i+1][0]);
			 			let paredes = [], paredesEs, paredesNo, paredesWe, paredesSo;
					 	switch(direcaoIndo2){
					 		case "up":
					 			paredes = Array.from(celula.querySelectorAll(".parede.north"));
		 						break;
					 		case "down":
					 			paredes = Array.from(celula.querySelectorAll(".parede.south"));
		 						break;
					 		case "left":
					 			paredes = Array.from(celula.querySelectorAll(".parede.west"));
		 						break;
					 		case "right":
					 			paredes = Array.from(celula.querySelectorAll(".parede.east"));
		 						break;
			 				case "right-up":
					 			paredesEs = Array.from(celula.querySelectorAll(".parede.east"));
					 			paredesNo =  Array.from(celula.querySelectorAll(".parede.north"));
					 			if(paredesEs.length > 0 && paredesNo.length >0){
					 				paredes= paredes.concat(paredesEs);
					 				paredes= paredes.concat(paredesNo);
					 			}else if(paredesEs.length > 0){
					 				if(temParedeEmCima(celula,".east")){
					 					paredes= paredes.concat(paredesEs);
					 				}
					 			}else if(paredesNo.length > 0){
					 				if(temParedeADireita(celula,".north")){
					 					paredes= paredes.concat(paredesNo);
					 				}
					 			}
			 					break;
			 				case "right-down":
			 					paredesEs = Array.from(celula.querySelectorAll(".parede.east"));
					 			paredesSo =  Array.from(celula.querySelectorAll(".parede.south"));
					 			if(paredesEs.length > 0 && paredesSo.length >0){
					 				paredes= paredes.concat(paredesWe);
					 				paredes= paredes.concat(paredesSo);
					 			}else if(paredesEs.length > 0){
					 				if(temParedeEmBaixo(celula,".east")){
					 					paredes= paredes.concat(paredesEs);
					 				}
					 			}else if(paredesSo.length > 0){
					 				if(temParedeADireita(celula,".south")){
					 					paredes= paredes.concat(paredesSo);
					 				}
					 			}
			 					break;
			 				case "left-up":
			 					paredesWe = Array.from(celula.querySelectorAll(".parede.west"));
					 			paredesNo =  Array.from(celula.querySelectorAll(".parede.north"));
					 			if(paredesWe.length > 0 && paredesNo.length >0){
					 				paredes= paredes.concat(paredesWe);
					 				paredes= paredes.concat(paredesNo);
					 			}else if(paredesWe.length > 0){
					 				if(temParedeEmCima(celula,".west")){
					 					paredes= paredes.concat(paredesWe);
					 				}
					 			}else if(paredesNo.length > 0){
					 				if(temParedeAEsquerda(celula,".north")){
					 					paredes= paredes.concat(paredesNo);
					 				}
					 			}
			 					break;
			 				case "left-down":
			 					paredesWe = Array.from(celula.querySelectorAll(".parede.west"));
					 			paredesSo =  Array.from(celula.querySelectorAll(".parede.south"));
					 			if(paredesWe.length > 0 && paredesSo.length >0){
					 				paredes= paredes.concat(paredesWe);
					 				paredes= paredes.concat(paredesSo);
					 			}else if(paredesWe.length > 0){
					 				if(temParedeEmBaixo(celula,".west")){
					 					paredes= paredes.concat(paredesWe);
					 				}
					 			}else if(paredesSo.length > 0){
					 				if(temParedeAEsquerda(celula,".south")){
					 					paredes= paredes.concat(paredesSo);
					 				}
					 			}
			 					break;
					 	}
			 			if(paredes.length > 0){
			 				paredes.forEach(parede => {
			 					parede.classList.add("naMira");
			 				});
			 				celula.classList.add("naMira");
			 				alvoNaMira = celula;
			 				break;
			 			}
			 		}
				}

				let beginX = celulaOrigem.offsetLeft + tabSize[percentualAtualTabSize]/2;
				let beginY = celulaOrigem.offsetTop + tabSize[percentualAtualTabSize]/2;
			
				if(alvoNaMira!=null){
					// destinoOffsetX = getOffsetXCelulaNoTab(alvoNaMira);
					destinoOffsetX = alvoNaMira.offsetLeft + tabSize[percentualAtualTabSize]/2;
					destinoOffsetY = alvoNaMira.offsetTop + tabSize[percentualAtualTabSize]/2;
				}
				desenhaMiraCanvasContextualized = () => desenhaMiraCanvas(beginX, beginY, destinoOffsetX, destinoOffsetY);
				desenhaMiraCanvasContextualized();
				desenhaMiraCanvasInterval = setInterval(desenhaMiraCanvasContextualized, 200);

				var person = selecionado.querySelector('.person');

			    var mouseX = destinoOffsetX;
        		var mouseY = destinoOffsetY;

				var centerY = beginY;
				var centerX = beginX;
	    		var radians = Math.atan2(mouseX - centerX, mouseY - centerY);
	    		var degrees = (radians * (180 / Math.PI) * -1) + 180; 
	    		person.style.transition = 'none';
	    		person.style.transform = 'rotate('+degrees+'deg)';
	    		atualizaMiniTab();
	    		
		}

		function direcaoUmParaOutro(celulaAnterior,celulaPosterior){
			if(celulaAnterior == null || celulaPosterior == null)return null;

			let celulaAnteriorX = parseInt(celulaAnterior.dataset.coordX);
			let celulaAnteriorY = parseInt(celulaAnterior.dataset.coordY);
			let celulaPosteriorX = parseInt(celulaPosterior.dataset.coordX);
			let celulaPosteriorY = parseInt(celulaPosterior.dataset.coordY);
			if(celulaAnteriorX<celulaPosteriorX){
				if(celulaAnteriorY==celulaPosteriorY){
					return "right";
				}else if(celulaAnteriorY>celulaPosteriorY){
					return "right-up";
				}else{
					return "right-down";
				}
			}
			if(celulaAnteriorX>celulaPosteriorX){
				if(celulaAnteriorY==celulaPosteriorY){
					return "left";
				}else if(celulaAnteriorY>celulaPosteriorY){
					return "left-up";
				}else{
					return "left-down";
				}
			}
			if(celulaAnteriorY<celulaPosteriorY){
				return "down";
			}
			if(celulaAnteriorY>celulaPosteriorY){
				return "up";
			}
			return null;
		}

		function temParedeEmCima(celula, classDirecao){
			let celX = parseInt(celula.dataset.coordX);
			let celY = parseInt(celula.dataset.coordY);
			if(celY>0){
				return temParede(arrayCelulas[celY-1][celX], classDirecao);
			}
			return false;
		}

		function temParedeEmBaixo(celula, classDirecao){
			let celX = parseInt(celula.dataset.coordX);
			let celY = parseInt(celula.dataset.coordY);
			if(celY<QUANT_CELULAS-1){
				return temParede(arrayCelulas[celY+1][celX], classDirecao);
			}
			return false;
		}

		function temParedeAEsquerda(celula, classDirecao){
			let celX = parseInt(celula.dataset.coordX);
			let celY = parseInt(celula.dataset.coordY);
			if(celY>0){
				return temParede(arrayCelulas[celY][celX-1], classDirecao);
			}
			return false;
		}

		function temParedeADireita(celula, classDirecao){
			let celX = parseInt(celula.dataset.coordX);
			let celY = parseInt(celula.dataset.coordY);
			if(celY<QUANT_CELULAS-1){
				return temParede(arrayCelulas[celY][celX+1], classDirecao);
			}
			return false;
		}

		function temParede(celula, classDirecao){
			if(celula.querySelector(classDirecao)!=null){
				return true;
			}
			return false;
		}

		let offsetDash = 0;
		function desenhaMiraCanvas(beginX, beginY, destinoOffsetX, destinoOffsetY){
				limpaCanvas();
			    ctx.strokeStyle = 'rgba(255,0,0,0.8)';
			    ctx.lineWidth = 3;
			    if(percentualAtualTabSize>50){
			   		ctx.strokeStyle = 'rgba(255,0,0,0.6)';
			    	ctx.lineWidth = 4;
			    }else if(percentualAtualTabSize>100){
			   		ctx.strokeStyle = 'rgba(255,0,0,0.4)';
			    	ctx.lineWidth = 5;
			    }else if(percentualAtualTabSize>150){
			    	ctx.strokeStyle = 'rgba(255,0,0,0.3)';
			    	ctx.lineWidth = 6;
			    }
			    ctx.beginPath();

			    ctx.setLineDash([6, 6]);
  				ctx.lineDashOffset = -offsetDash;
  				offsetDash+=3;
  				if(offsetDash>31){
  					offsetDash -= 30;
  				}

			    ctx.moveTo(beginX, beginY);
			    ctx.lineTo(destinoOffsetX, destinoOffsetY);
			    ctx.stroke();
		}

		function tracaCaminhoDeMiraPorHipotenusa(celulaOrigem,celulaDestino){
			if(celulaOrigem == celulaDestino) return [];
			let origemX = parseInt(celulaOrigem.dataset.coordX);
			let origemY = parseInt(celulaOrigem.dataset.coordY);
			let destinoX = parseInt(celulaDestino.dataset.coordX);
			let destinoY = parseInt(celulaDestino.dataset.coordY);

			let hipotenusa = getHipotenusaCelulas(celulaOrigem,celulaDestino);

			let incremetacaoX = (origemX==destinoX)?0:(origemX<destinoX)?1:-1;
			let incremetacaoY = (origemY==destinoY)?0:(origemY<destinoY)?1:-1;


			let caminhoDeMira = [];
			caminhoDeMira.push([celulaOrigem,0]);
			let proxCelula = celulaOrigem;
			let menorSomaCatetos = 0;

			while(proxCelula!=celulaDestino||proxCelula==null){
				let proxCelulaX = parseInt(proxCelula.dataset.coordX);
				let proxCelulaY = parseInt(proxCelula.dataset.coordY);
				var proxCelulaIncreX = null, proxCelulaIncreY = null;
				
				if(proxCelulaX+incremetacaoX>=0 && proxCelulaX+incremetacaoX <QUANT_CELULAS){
					proxCelulaIncreX = arrayCelulas[proxCelulaY][proxCelulaX+incremetacaoX];
					var hipotenusaX = getHipotenusaCelulas(proxCelulaIncreX,celulaDestino);
					var catetoX = getHipotenusaCelulas(celulaOrigem,proxCelulaIncreX)
					var somaCatetosX = catetoX +hipotenusaX;
				}

				if(proxCelulaY+incremetacaoY>=0 && proxCelulaY+incremetacaoY <QUANT_CELULAS){
					proxCelulaIncreY = arrayCelulas[proxCelulaY+incremetacaoY][proxCelulaX];
					var hipotenusaY = getHipotenusaCelulas(proxCelulaIncreY,celulaDestino);
					var catetoY = getHipotenusaCelulas(celulaOrigem,proxCelulaIncreY)
					var somaCatetosY = catetoY +hipotenusaY;
				}

				// formula de heron para se achar as areas
				// let semiperimetroX = (hipotenusa+hipotenusaX+catetoX)/2;
				// let semiperimetroY = (hipotenusa+hipotenusaY+catetoY)/2;

				// let areaX = Math.sqrt(semiperimetroX*(semiperimetroX-hipotenusa)*(semiperimetroX-hipotenusaX)*(semiperimetroX-catetoX));
				// let areaY = Math.sqrt(semiperimetroY*(semiperimetroY-hipotenusa)*(semiperimetroY-hipotenusaY)*(semiperimetroY-catetoY));
				if(proxCelulaIncreX == null || somaCatetosX > somaCatetosY){
					proxCelula = proxCelulaIncreY;
					menorSomaCatetos = (somaCatetosY-hipotenusa)*1000;
				}else if(proxCelulaIncreY == null || somaCatetosY > somaCatetosX){
					proxCelula = proxCelulaIncreX;
					menorSomaCatetos = (somaCatetosX-hipotenusa)*1000;
				}else if (somaCatetosX == somaCatetosY){
					proxCelula = arrayCelulas[proxCelulaY+incremetacaoY][proxCelulaX+incremetacaoX];
				}else {
					break;
				}
				caminhoDeMira.push([proxCelula,menorSomaCatetos]);
			}
			return caminhoDeMira;
		}


		function getHipotenusaCelulas(celulaOrigem,celulaDestino){
			let origemX = parseInt(celulaOrigem.dataset.coordX);
			let origemY = parseInt(celulaOrigem.dataset.coordY);
			let destinoX = parseInt(celulaDestino.dataset.coordX);
			let destinoY = parseInt(celulaDestino.dataset.coordY);
			let diferencaX = origemX - destinoX;
			let diferencaY = origemY - destinoY;
			let hipotenusa = Math.pow(diferencaX, 2) + Math.pow(diferencaY, 2);
			hipotenusa = Math.sqrt(hipotenusa);
			if(!isFinite(hipotenusa)){
				hipotenusa = 0;
			}
			return hipotenusa;
		}

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
				// if(!e.target.classList.contains("tabuleiro")){return}
				let celulaDestino = e.target;
				 while(!celulaDestino.classList.contains("celula")){
				 	celulaDestino = celulaDestino.parentElement;
				 	if(celulaDestino == tabuleiro){
				 		console.error("mirar com target não filho de  celula ",e.target)
				 		return;
				 	}
				 }
				// console.log('mirar','x '+e.offsetX,'y '+e.offsetY);
				let destinoOffsetX = e.offsetX + (celulaDestino.dataset.coordX * tabSize[percentualAtualTabSize]);
				let destinoOffsetY = e.offsetY + (celulaDestino.dataset.coordY * tabSize[percentualAtualTabSize]);
				// console.log('destino','x '+destinoOffsetX,'y '+destinoOffsetY);

				
				 // ctx.fillRect(0,0,250,200);
				var selecionado = document.querySelector('.peca.selected');
				if(!selecionado) return;
				let celulaOrigem = selecionado.parentElement;


				let caminhoDeMira = tracaCaminhoDeMiraPorHipotenusa(celulaOrigem,celulaDestino);
				let alvoNaMira = false;
				let celulaAnterior = celulaOrigem;
				for(let i=0;i<caminhoDeMira.length;i++){
				 	let celula = caminhoDeMira[i][0];
				 	celula.classList.add("caminhoMira");

					// paredes: simples, se tem na ida ou na volta, as acerta, se não, passa reto
					if(i>0){
						celulaAnterior = caminhoDeMira[i-1][0];
					}
				 	let direcaoVinda = direcaoUmParaOutro(celulaAnterior,celula);
		 			let parede = false;
		 			console.log("direcaoVinda",direcaoVinda);
				 	switch(direcaoVinda){
				 		case "up":
				 			parede = celula.querySelector(".parede.south");
		 					console.log("parede",parede);
		 					break;
				 		case "down":
				 			parede = celula.querySelector(".parede.north");
		 					console.log("parede",parede);
		 					break;
				 		case "left":
				 			parede = celula.querySelector(".parede.east");
		 					console.log("parede",parede);
		 					break;
				 		case "right":
				 			parede = celula.querySelector(".parede.west");
		 					console.log("parede",parede);
		 					break;
				 	}
		 			if(parede!=null){
		 				console.log("parede",parede);
		 				parede.classList.add("naMira");
		 				celula.classList.add("naMira");
		 				alvoNaMira = true;
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
					if(peca != null){
						if(caminhoDeMira[i][1]<=50){
			 				peca.classList.add("naMira");
			 				celula.classList.add("naMira");
		 					alvoNaMira = true;
						}
					}

					if(i<caminhoDeMira.length-1){
					 	let direcaoVinda = direcaoUmParaOutro(celula, caminhoDeMira[i+1][0]);
			 			let parede = false;
					 	switch(direcaoVinda){
					 		case "up":
					 			parede = celula.querySelector(".parede.north");
		 						break;
					 		case "down":
					 			parede = celula.querySelector(".parede.south");
		 						break;
					 		case "left":
					 			parede = celula.querySelector(".parede.west");
		 						break;
					 		case "right":
					 			parede = celula.querySelector(".parede.east");
		 						break;
					 	}
			 			if(parede!=null){
			 				parede.classList.add("naMira");
			 				celula.classList.add("naMira");
			 				alvoNaMira = true;
			 			}
			 		}
			 		if(alvoNaMira){
			 			break;
			 		}
				}

				let beginX = celulaOrigem.offsetLeft + tabSize[percentualAtualTabSize]/2;
				let beginY = celulaOrigem.offsetTop + tabSize[percentualAtualTabSize]/2;
			
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
	    		
		}

		function direcaoUmParaOutro(celulaAnterior,celulaPosterior){
			let celulaAnteriorX = parseInt(celulaAnterior.dataset.coordX);
			let celulaAnteriorY = parseInt(celulaAnterior.dataset.coordY);
			let celulaPosteriorX = parseInt(celulaPosterior.dataset.coordX);
			let celulaPosteriorY = parseInt(celulaPosterior.dataset.coordY);
			if(celulaAnteriorX<celulaPosteriorX){
				return "right";
			}
			if(celulaAnteriorX>celulaPosteriorX){
				return "left";
			}
			if(celulaAnteriorY<celulaPosteriorY){
				return "down";
			}
			if(celulaAnteriorY>celulaPosteriorY){
				return "up";
			}
			return null;
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

			avisos.innerHTML = ""; //TODO << REMOVER!!!!!!!!!!!!
			if(celulaOrigem == celulaDestino) return null;
			let origemX = parseInt(celulaOrigem.dataset.coordX);
			let origemY = parseInt(celulaOrigem.dataset.coordY);
			let destinoX = parseInt(celulaDestino.dataset.coordX);
			let destinoY = parseInt(celulaDestino.dataset.coordY);

			let hipotenusa = getHipotenusaCelulas(celulaOrigem,celulaDestino);

			avisos.innerHTML+="hipotenusa "+hipotenusa.toFixed(3)+" <br/>"

			let incremetacaoX = (origemX==destinoX)?0:(origemX<destinoX)?1:-1;
			let incremetacaoY = (origemY==destinoY)?0:(origemY<destinoY)?1:-1;


			let caminhoDeMira = [];
			let proxCelula = celulaOrigem;
			let menorSomaCatetos = 0;

			while(proxCelula!=celulaDestino||proxCelula==null){
				let proxCelulaX = parseInt(proxCelula.dataset.coordX);
				let proxCelulaY = parseInt(proxCelula.dataset.coordY);

				let proxCelulaIncreX = arrayCelulas[proxCelulaY][proxCelulaX+incremetacaoX];
				let hipotenusaX = getHipotenusaCelulas(proxCelulaIncreX,celulaDestino);

				let proxCelulaIncreY = arrayCelulas[proxCelulaY+incremetacaoY][proxCelulaX];
				let hipotenusaY = getHipotenusaCelulas(proxCelulaIncreY,celulaDestino);

				let catetoX = getHipotenusaCelulas(celulaOrigem,proxCelulaIncreX)
				let catetoY = getHipotenusaCelulas(celulaOrigem,proxCelulaIncreY)

				// formula de heron para se achar as areas
				// let semiperimetroX = (hipotenusa+hipotenusaX+catetoX)/2;
				// let semiperimetroY = (hipotenusa+hipotenusaY+catetoY)/2;

				// let areaX = Math.sqrt(semiperimetroX*(semiperimetroX-hipotenusa)*(semiperimetroX-hipotenusaX)*(semiperimetroX-catetoX));
				// let areaY = Math.sqrt(semiperimetroY*(semiperimetroY-hipotenusa)*(semiperimetroY-hipotenusaY)*(semiperimetroY-catetoY));

				let somaCatetosX = catetoX +hipotenusaX;
				let somaCatetosY = catetoY +hipotenusaY;

				if      (somaCatetosX == somaCatetosY){
					proxCelula = arrayCelulas[proxCelulaY+incremetacaoY][proxCelulaX+incremetacaoX];
					avisos.innerHTML +="== "
				}else if(somaCatetosX < somaCatetosY){
					proxCelula = proxCelulaIncreX;
					avisos.innerHTML +="IncreX "
					menorSomaCatetos = (somaCatetosX-hipotenusa)*1000;
				}else if(somaCatetosX > somaCatetosY){
					proxCelula = proxCelulaIncreY;
					avisos.innerHTML +="IncreY " 
					menorSomaCatetos = (somaCatetosY-hipotenusa)*1000;
				}else{
					console.log("breaking ","areaX",somaCatetosX,"areaY",somaCatetosY);
					break;
				}
				avisos.innerHTML +=" > menorSomaCatetos "+menorSomaCatetos.toFixed(2)+" > x "+proxCelula.dataset.coordX+" - y "+proxCelula.dataset.coordY+" <br /> ";
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
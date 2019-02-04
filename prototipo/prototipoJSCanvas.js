
		console.log('canvas');
		var ctx = canvasTabuleiro.getContext('2d');

		//event de mouse move
		function limpaCanvas(){
			ctx.clearRect(0,0,sizeAtualTabuleiro,sizeAtualTabuleiro);
		}

		let offsetDash = 0;
		function mirar(e){
	
				console.log(e.target.className);
				// if(!e.target.classList.contains("tabuleiro")){return}
				console.log('mirar');
				console.log('x '+e.offsetX);
				console.log('y '+e.offsetY);
				
				 // ctx.fillRect(0,0,250,200);
				var selecionado = document.querySelector('.peca.selected');
				if(!selecionado) return;
				let celula = selecionado.parentElement;
				console.dir(celula);
				let beginX = celula.offsetLeft + tabSize[percentualAtualTabSize]/2;
				let beginY = celula.offsetTop + tabSize[percentualAtualTabSize]/2;
				console.log('selecionado x '+beginX,' y '+beginY);
				
				limpaCanvas();
			    ctx.strokeStyle = 'rgba(255,0,0,0.3)';
			    ctx.lineWidth = 3;
			    ctx.beginPath();


			    ctx.setLineDash([4, 2]);
  				ctx.lineDashOffset = -offsetDash;
  				offsetDash++;
  				if(offsetDash>20){
  					offsetDash = 0;
  				}

			    ctx.moveTo(beginX, beginY);
			    ctx.lineTo(e.offsetX, e.offsetY);
			    ctx.stroke();


				var person = selecionado.querySelector('.person');

			    var mouseX = e.clientX;
        		var mouseY = e.clientY;

				var centerY = beginY;
				var centerX = beginX;
	    		var radians = Math.atan2(mouseX - centerX, mouseY - centerY);
	    		var degrees = (radians * (180 / Math.PI) * -1) + 180; 
	    		person.style.transition = 'none';
	    		person.style.transform = 'rotate('+degrees+'deg)';
				console.log('rotate('+degrees+'deg)');
	    		
		}


		console.log('canvas');
		var ctx = canvasTabuleiro.getContext('2d');

		//event de mouse move
		function limpaCanvas(){
			ctx.clearRect(0,0,sizeAtualTabuleiro,sizeAtualTabuleiro);
		}

		function mirar(e){
	
				console.log(e.target.className);
				// if(!e.target.classList.contains("tabuleiro")){return}
				console.log('mirar');
				console.log('x '+e.offsetX);
				console.log('y '+e.offsetY);
				
				 // ctx.fillRect(0,0,250,200);
				var selecionado = document.querySelector('.peca.selected');
				if(!selecionado)return;
				let beginX = selecionado.offsetLeft + sizeAtualCelula/2;
				let beginY = selecionado.offsetTop + sizeAtualCelula/2;
				console.log(' selecionado x '+beginX);
				console.log('selecionado y '+beginY);
				
				limpaCanvas();
			    ctx.strokeStyle = 'red';
			    ctx.lineWidth = 3;
			    ctx.beginPath();
			    
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
		}

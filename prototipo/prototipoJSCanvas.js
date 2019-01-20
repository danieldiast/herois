
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
				
				var selecionado = document.getElementsByClassName('selected')[0];
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
		};
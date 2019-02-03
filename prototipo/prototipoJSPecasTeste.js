// peca teste
		console.log('pecas teste');
		{
			let pecaSpider = document.createElement("div");	
			let personSpider = document.createElement("div");	
			pecaSpider.classList.add('peca');
			personSpider.classList.add('person');
			personSpider.classList.add('spiderman');
			pecaSpider.dataset.looking = "up";
			pecaSpider.dataset.char = "spiderman";
			pecaSpider.appendChild(personSpider);	

			let pecaWolv = document.createElement("div");	
			let personWolf = document.createElement("div");	
			pecaWolv.classList.add('peca');
			personWolf.classList.add('person');
			personWolf.classList.add('wolverine');
			pecaWolv.dataset.looking = "down";
			pecaWolv.dataset.char = "wolverine";
			pecaWolv.appendChild(personWolf);	


			let pecaSubz = document.createElement("div");	
			let personSubz = document.createElement("div");	
			pecaSubz.classList.add('peca');
			personSubz.classList.add('person');
			personSubz.classList.add('subzero');
			pecaSubz.dataset.looking = "down";
			pecaSubz.dataset.char = "subzero";
			pecaSubz.appendChild(personSubz);	



			// let celulas = document.getElementsByClassName("celula");
			// celulas[4].appendChild(peca);	
			arrayCelulas[4][4].appendChild(pecaSpider);
			arrayCelulas[2][2].appendChild(pecaWolv);
			arrayCelulas[5][2].appendChild(pecaSubz);
			arrayCelulas[0][1].appendChild(createSoldier());
			arrayCelulas[1][2].appendChild(createSoldier());
			arrayCelulas[5][3].appendChild(createSoldier());
			arrayCelulas[7][7].appendChild(createSoldier());
			arrayCelulas[8][8].appendChild(createSoldier());
			arrayCelulas[18][9].appendChild(createSoldier());
			arrayCelulas[23][18].appendChild(createSoldier());
			arrayCelulas[18][28].appendChild(createSoldier());

			pecaSpider.addEventListener('mousedown', mouseDownPeca, false);
			pecaWolv.addEventListener('mousedown', mouseDownPeca, false);
			pecaSubz.addEventListener('mousedown', mouseDownPeca, false);
		}
		
		function createSoldier(){
			let pecaSoldier = document.createElement("div");	
			let personSoldier = document.createElement("div");	
			pecaSoldier.classList.add('peca');
			personSoldier.classList.add('person');
			personSoldier.classList.add('soldier');
			pecaSoldier.dataset.looking = "down";
			pecaSoldier.dataset.char = "soldier";
			pecaSoldier.appendChild(personSoldier);	
			pecaSoldier.addEventListener('mousedown', mouseDownPeca, false);
			return pecaSoldier;
		}


		function mouseDownPeca(e) {
			console.log('mouseDownPeca');
			e.stopPropagation();  //apenas para cima
		//	e.stopImmediatePropagation(); << inclui o próprio elemento  

			if(e.target.classList.contains("selected")){
				e.target.classList.remove("selected");
				acoes.innerHTML = "";
				selecionado = null;
				return;
			}
			deselecionaTudo();
			selecionado = e.target;
			selecionado.classList.add("selected");

			let imgPortrait = document.createElement("img");	
			imgPortrait.classList.add("portrait");
			imgPortrait.src = "portrait/"+selecionado.dataset.char+".jpg";
			acoes.appendChild(imgPortrait);	

			//acoes.innerHTML = "Orientação: ";
			let bleft = document.createElement("button");	
			bleft.innerHTML = "&larr;"
			bleft.value = "left"
			let bdown = document.createElement("button");	
			bdown.innerHTML = "&darr;"
			bdown.value = "down"
			let bup = document.createElement("button");	
			bup.innerHTML = "&uarr;"
			bup.value = "up"
			let brigth = document.createElement("button");	
			brigth.innerHTML = "&rarr;"
			brigth.value = "right"

			bleft.addEventListener('click', look, false);
			bdown.addEventListener('click', look, false);
			bup.addEventListener('click', look, false);
			brigth.addEventListener('click', look, false);

			let bMirar = document.createElement("button");	
			let bAndar = document.createElement("button");	
			bMirar.innerHTML = "mirar"
			bMirar.id = "mirar"
			bMirar.value = "mirar"
			bAndar.innerHTML = "andar"
			bAndar.id = "andar"
			bAndar.value = "andar"
			bMirar.addEventListener('click', ativaMirar, false);
			bAndar.addEventListener('click', ativaAndar, false);

			acoes.appendChild(bleft);	
			acoes.appendChild(bdown);	
			acoes.appendChild(bup);	
			acoes.appendChild(brigth);	
			// acoes.innerHTML += "<br />";	
			acoes.appendChild(document.createElement("br"));	
			acoes.appendChild(bMirar);	
			acoes.appendChild(bAndar);	

			if(selecionado.dataset.char == "wolverine"){
				let bGarra = document.createElement("button");	
				bGarra.value = "garra"
				bGarra.id = "garra"
				bGarra.innerHTML = "garra"
				bGarra.addEventListener('click', ativaGarra, false);
				acoes.appendChild(document.createElement("br"));	
				acoes.appendChild(bGarra);	
			}

		}

		document.addEventListener('keydown', function (e){
			console.log(e.key+" "+e.keyCode);
			if(e.key === "Escape") {
				console.log('desativa');
				desativaMirar();
				desativaAndar();
			}
		},false)
		
		function ativaMirar(e){
			console.log("ativaMirar");
			pad.classList.remove("noPointerEvents")
			pad.addEventListener('mousemove', mirar, false);
			avisos.innerHTML = "ESC: sair";
			this.removeEventListener('click', ativaMirar, false);
			this.addEventListener('click', desativaMirar, false);
		}
		
		function desativaMirar(){
			console.log("desativaMirar");
			avisos.innerHTML = "";
			pad.classList.add("noPointerEvents")
			pad.removeEventListener('mousemove', mirar, false);
			limpaCanvas();
			document.querySelector("button#mirar").addEventListener('click', ativaMirar, false);
			document.querySelector("button#mirar").removeEventListener('click', desativaMirar, false)
			
			var person = document.querySelector('.peca.selected .person');
    		person.style.removeProperty('transition');
    		person.style.removeProperty('transform');

		}


		function deselecionaTudo(){
			var elements = Array.from(document.getElementsByClassName('selected'));
			[].forEach.call(elements, function(el) {
		    	el.classList.remove("selected");
			});
			acoes.innerHTML = "";
			selecionado = null;
		}


		function look(e){
			console.log('look');
			var newLooking = e.target.value;
			var selecionada = document.querySelector('.peca.selected');
			selecionada.dataset.looking = newLooking;
		}

		function ativaGarra(e){
			console.log("ativaGarra");
			selecionado.classList.add("garra");
			selecionado.classList.add("duasCelulas");
		}
		
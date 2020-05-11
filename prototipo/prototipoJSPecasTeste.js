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


			let pecaCyclops = document.createElement("div");	
			let personCyclops = document.createElement("div");	
			pecaCyclops.classList.add('peca');
			personCyclops.classList.add('person');
			personCyclops.classList.add('cyclops');
			pecaCyclops.dataset.looking = "up";
			pecaCyclops.dataset.char = "cyclops";
			pecaCyclops.appendChild(personCyclops);	




			// let celulas = document.getElementsByClassName("celula");
			// celulas[4].appendChild(peca);	
			tabuleiroObj.arrayCelulas[4][4].appendChild(pecaSpider);
			tabuleiroObj.arrayCelulas[2][2].appendChild(pecaWolv);
			tabuleiroObj.arrayCelulas[5][2].appendChild(pecaSubz);
			tabuleiroObj.arrayCelulas[6][6].appendChild(pecaCyclops);
			tabuleiroObj.arrayCelulas[0][1].appendChild(createSoldier());
			tabuleiroObj.arrayCelulas[1][2].appendChild(createSoldier());
			tabuleiroObj.arrayCelulas[6][3].appendChild(createSoldier());
			tabuleiroObj.arrayCelulas[7][7].appendChild(createSoldier());
			tabuleiroObj.arrayCelulas[7][8].appendChild(createSoldier());
			tabuleiroObj.arrayCelulas[8][8].appendChild(createSoldier());
			tabuleiroObj.arrayCelulas[18][9].appendChild(createSoldier());
			tabuleiroObj.arrayCelulas[23][18].appendChild(createSoldier());
			tabuleiroObj.arrayCelulas[18][28].appendChild(createSoldier());


			tabuleiroObj.arrayCelulas[10][10].appendChild(createSoldier());
			tabuleiroObj.arrayCelulas[10][12].appendChild(createSoldier());
			tabuleiroObj.arrayCelulas[11][11].appendChild(createSoldier());
			tabuleiroObj.arrayCelulas[11][9].appendChild(createSoldier());
			tabuleiroObj.arrayCelulas[2][13].appendChild(createSoldier());
			tabuleiroObj.arrayCelulas[5][15].appendChild(createSoldier());
			tabuleiroObj.arrayCelulas[5][18].appendChild(createSoldier());

			pecaSpider.addEventListener('mousedown', mouseDownPeca, false);
			pecaWolv.addEventListener('mousedown', mouseDownPeca, false);
			pecaSubz.addEventListener('mousedown', mouseDownPeca, false);
			pecaCyclops.addEventListener('mousedown', mouseDownPeca, false);

			tabuleiroObj.arrayCelulas[6][1].appendChild(createItem('awp'));
			tabuleiroObj.arrayCelulas[6][11].appendChild(createItem('ak47'));
			tabuleiroObj.arrayCelulas[6][21].appendChild(createItem('colt'));
			tabuleiroObj.arrayCelulas[16][13].appendChild(createItem('granade'));
			tabuleiroObj.arrayCelulas[16][14].appendChild(createItem('sword_case'));
			tabuleiroObj.arrayCelulas[2][19].appendChild(createItem('deagle'));
			tabuleiroObj.arrayCelulas[26][21].appendChild(createItem('machine'));
			tabuleiroObj.arrayCelulas[26][22].appendChild(createItem('sword1'));
			tabuleiroObj.arrayCelulas[26][23].appendChild(createItem('bazooka'));
			tabuleiroObj.arrayCelulas[24][24].appendChild(createItem('glock'));
			tabuleiroObj.arrayCelulas[25][18].appendChild(createItem('molotov'));
			tabuleiroObj.arrayCelulas[27][17].appendChild(createItem('sword2'));

			tabuleiroObj.arrayCelulas[2][15].appendChild(createRolls('rolls'));


			tabuleiroObj.arrayCelulas[0][0].appendChild(createTree());
			tabuleiroObj.arrayCelulas[0][5].appendChild(createTree());
			tabuleiroObj.arrayCelulas[15][1].appendChild(createTree());
			tabuleiroObj.arrayCelulas[7][1].appendChild(createTree());
			tabuleiroObj.arrayCelulas[9][0].appendChild(createTree());
			tabuleiroObj.arrayCelulas[0][18].appendChild(createTree());
			tabuleiroObj.arrayCelulas[0][22].appendChild(createTree());


		}

		function createItem(itemStr, looking = getRandomLooking()){
			let item = document.createElement("div");	
			item.classList.add('item');
			item.classList.add(itemStr);
			item.dataset.looking = looking;
			item.dataset.item = itemStr;
			return item;
		}

		function createTree(scenarioStr = selectRandom('tree1','tree2','tree3'), looking = getRandomLooking()){
			let scenario = document.createElement("div");	
			scenario.classList.add('scenario');
			scenario.classList.add(scenarioStr);
			scenario.dataset.looking = looking;
			scenario.dataset.cellsW = '1';
			scenario.dataset.cellsH = '1';
			scenario.dataset.scenario = scenarioStr;
			return scenario;
		}

		function createRolls(looking = 'down'){
			let vehi = document.createElement("div");	
			vehi.classList.add('vehi');
			vehi.classList.add('rolls');
			vehi.dataset.looking = looking;
			vehi.dataset.cellsW = '2';
			vehi.dataset.cellsH = '3';
			vehi.dataset.vech = 'rolls';
			return vehi;
		}
		
		function createSoldier(){
			let pecaSoldier = document.createElement("div");	
			let personSoldier = document.createElement("div");	
			pecaSoldier.classList.add('peca');
			personSoldier.classList.add('person');
			personSoldier.classList.add('soldier');
			pecaSoldier.dataset.looking = getRandomLooking();
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
			imgPortrait.src = "portrait/"+selecionado.dataset.char+".png";
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
			atualizaMiniTab();

		}

		document.addEventListener('keydown', function (e){
			//console.log(e.key+" "+e.keyCode);
			if(e.key === "Escape") {
				console.log('desativa');
				desativaMirar();
				desativaAndar();
				atualizaMiniTab();
			}
		},false)
		
		function ativaMirar(e){
			console.log("ativaMirar");
			//pad.classList.remove("noPointerEvents")
			//pad.addEventListener('mousemove', mirar, false);
			tabuleiro.querySelectorAll(".parede").forEach(parede => {
				parede.classList.add("noPointerEvents");
			});
			tabuleiro.addEventListener('mousemove', mirar, false);

			avisos.innerHTML = "ESC: sair";
			this.removeEventListener('click', ativaMirar, false);
			this.addEventListener('click', desativaMirar, false);
		}
		
		function desativaMirar(){
			console.log("desativaMirar");

			removeClassSelection(".naMira","naMira");	
			removeClassSelection(".caminhoMira", "caminhoMira")
			Array.from(tabuleiro.getElementsByClassName('percentPassagem')).forEach(span => {
	    		span.parentElement.removeChild(span);
	    	})	;

			avisos.innerHTML = "";
			//pad.classList.add("noPointerEvents")
			// pad.removeEventListener('mousemove', mirar, false);
			tabuleiro.removeEventListener('mousemove', mirar, false);
			tabuleiro.querySelectorAll(".parede").forEach(parede => {
				parede.classList.remove("noPointerEvents");
			});


			clearInterval(desenhaMiraCanvasInterval); // var on canvas js file...
			limpaCanvas();

			var person = document.querySelector('.peca.selected .person');
			if(person != null){
	    		person.style.removeProperty('transition');
	    		person.style.removeProperty('transform');

				document.querySelector("button#mirar").addEventListener('click', ativaMirar, false);
				document.querySelector("button#mirar").removeEventListener('click', desativaMirar, false)
			}
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

			e.target.removeEventListener('click', ativaGarra, false);
			e.target.addEventListener('click', desativaGarra, false);
		}
		
		function desativaGarra(e){
			console.log("ativaGarra");
			selecionado.classList.remove("garra");
			selecionado.classList.remove("duasCelulas");

			e.target.removeEventListener('click', desativaGarra, false);
			e.target.addEventListener('click', ativaGarra, false);
		}
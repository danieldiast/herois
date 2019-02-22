 
		
	const MOLDE_MAX_WIDTH_POSSIBLE = 800;
	const MOLDE_MAX_HEIGHT_POSSIBLE = 800;
	const MOLDE_MIN_WIDTH_POSSIBLE = 500;
	const MOLDE_MIN_HEIGHT_POSSIBLE = 500;


	molde.addEventListener('mousemove', e =>{
		molde.style.cursor = "default";
		let lateral = false;
		let vertical = false;
		if(e.offsetX >= tabuleiroObj.moldeWidth - BORDER_MOLDE*2){
			lateral = true;
		}
		if(e.offsetY >= tabuleiroObj.moldeHeight - BORDER_MOLDE*2){
			vertical = true;
		}	
		if(lateral){
			molde.style.cursor = "w-resize";
		}
		if(vertical){
			molde.style.cursor = "ns-resize";
		}
		if(lateral && vertical){
			molde.style.cursor = "se-resize";
		}

	},false);


	molde.addEventListener('mousedown', e =>{
		if(e.target != molde){
			return;
		}
		e.preventDefault();  
		if(e.button != 0){ // se não foi botão esquerdo
			return;
		}

		if(e.offsetX >= tabuleiroObj.moldeWidth - BORDER_MOLDE*2){
			console.log('resize molde lateral');
			resizeMoldeWidth = true;
			document.body.style.cursor = "w-resize";
		}else{
			resizeMoldeWidth = false;
		}
		if(e.offsetY >= tabuleiroObj.moldeHeight - BORDER_MOLDE*2){
			console.log('resize molde bottom');
			resizeMoldeHeight = true;
			if(resizeMoldeWidth){
				document.body.style.cursor = "se-resize";
			}else{
				document.body.style.cursor = "ns-resize";
			}
		}else{
			resizeMoldeHeight = false;
		}

		if(resizeMoldeWidth || resizeMoldeHeight){
	    	window.addEventListener('mousemove', resizeMolde, true);
		}
	},false);

	window.addEventListener('mouseup', () => {
	    window.removeEventListener('mousemove', resizeMolde, true);
		avisos.innerHTML = "";		
		document.body.style.cursor = "default";	
		resizeMoldeWidth = false;
		resizeMoldeHeight = false;
	}, false);


	var resizeMoldeWidth = false;
	var resizeMoldeHeight = false;
	function resizeMolde(e) {
		if(resizeMoldeWidth){
			tabuleiroObj.moldeWidth += e.movementX;
			tabuleiroObj.moldeWidth = Math.max(tabuleiroObj.moldeWidth, MOLDE_MIN_WIDTH_POSSIBLE);
			tabuleiroObj.moldeWidth = Math.min(tabuleiroObj.moldeWidth, MOLDE_MAX_WIDTH_POSSIBLE);
			molde.style.width = tabuleiroObj.moldeWidth;
		}

		if(resizeMoldeHeight){
			tabuleiroObj.moldeHeight += e.movementY;
			tabuleiroObj.moldeHeight = Math.max(tabuleiroObj.moldeHeight, MOLDE_MIN_HEIGHT_POSSIBLE);
			tabuleiroObj.moldeHeight = Math.min(tabuleiroObj.moldeHeight, MOLDE_MAX_HEIGHT_POSSIBLE);
			molde.style.height = tabuleiroObj.moldeHeight;
		}
		atualizaMiniTab();
	};



var complier = require('../index');
var input = document.getElementById('input');
var output = document.getElementById('output');
input.onkeyup = function () {
	try{
		var code = complier(input.value);
	}catch(e){
		output.innerHTML = 'ERROR！';
	}
	if(code){
		output.innerHTML = code;
	}else{
		output.innerHTML = 'ERROR！';
	}
	
};
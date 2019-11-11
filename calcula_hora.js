/* 
    Script para calcular a hora de ir embora.
    Para que functione é necessário:
    1- Configurar os campos abaixo. Caso não queira colocar usuário e senha no script, apenas digita-los antes de usar.
    2- Clicar com o botão direito sobre a barra de favoritos do navegador (Chrome: Ctrl+Shift+B).
    3- Adicionar página e em URL copiar e colar todo o conteúdo abaixo desse comentário.
    4- Nome de preferencia para o favorito.
    Após isso, rodar o scrip ao clicar no favorito criado e esperar para que o trabalho seja feito.
    Criado inicialmente para CLT's -> futuras implementações para estagiário.

    Criado por: piique
*/

javascript: 
var usuario = '<USUARIO>';
var pass = '<SENHA>';

var horario_base = '09:00';
var horas_por_dia = '08:00';
var considerar_almoco = 30; /* considerar como almoço a partir de x minutos */
var considera_horario_de_verao = false;

function login(usuario, pass) {
    if (document.getElementById('int_login:tab_int_login:valida')) {
        document.getElementById('int_login:tab_int_login:acesso').value = usuario;
        document.getElementById('int_login:tab_int_login:senha').value = pass;
        document.getElementById('int_login:tab_int_login:valida').click();
    }
    setTimeout(function () {
        if (document.getElementById('menu1003871')) {
            document.getElementById('menu1003871').click();
        }
        setTimeout(function () {
            if (document.getElementById('win_int00018_000:tab_int00018_000_000_filter:filter')) {
                document.getElementById('win_int00018_000:tab_int00018_000_000_filter:filter').click();
            }
            setTimeout(function () {
                if (document.getElementsByClassName('slick-cell lr l1 r1 tk-date-cell disabled')[document.getElementsByClassName('slick-cell lr l1 r1 tk-date-cell disabled').length - 1]) {
                    document.getElementsByClassName('slick-cell lr l1 r1 tk-date-cell disabled')[document.getElementsByClassName('slick-cell lr l1 r1 tk-date-cell disabled').length - 1].click();
                }
                setTimeout(function () {
                    calculaHora(document.getElementById('win_int00018_000:tab_int00018_000_001:grid').getElementsByClassName('slick-viewport')[0].getElementsByClassName('grid-canvas')[0]);
                }, 4000);
            }, 2700);
        }, 7000);
    }, 4000);
};

function calculaHora(gridElement) {
	let horasDia = timeToMinutes(horas_por_dia);
	let horaAtual = getHoraAtual(considera_horario_de_verao);
	let horaEntradaReal = timeToMinutes(gridElement.children[0].children[1].innerHTML);
	let horaEntrada = horaEntradaReal >= timeToMinutes(horario_base) - 5 ? timeToMinutes(gridElement.children[0].children[1].innerHTML) : timeToMinutes(horario_base) - 5;
	if (gridElement.childElementCount == 1) {
		window.alert('Faltam ' + (minutesToTime(horasDia - (horaAtual - horaEntrada) + 60)) + ' para ir embora.\n' + 'Horário de saída: ' + (minutesToTime(horasDia - (horaAtual - horaEntrada) + 60 + horaAtual)));
	} else if (gridElement.childElementCount >= 3) {
		let ultimaEntrada = timeToMinutes(gridElement.children[gridElement.childElementCount - 2].children[1].innerHTML);
		let totalTrabalhado = horaAtual - ultimaEntrada + timeToMinutes(gridElement.children[gridElement.childElementCount - 1].children[gridElement.children[gridElement.childElementCount - 1].childElementCount - 1].innerHTML);
		console.log(minutesToTime(totalTrabalhado));
		totalTrabalhado = horaEntradaReal == horaEntrada ? totalTrabalhado : totalTrabalhado - (horaEntrada - horaEntradaReal);
		console.log(minutesToTime(totalTrabalhado));
		let intervalos = [];
		let qtdIntervalos = gridElement.childElementCount - 2;
		let retirarValor = 0;
		let maxInterval = 0;
		let almoco = 60;
		for (let i = 0; i < qtdIntervalos; i++) {
			intervalos[i] = timeToMinutes(gridElement.children[i + 1].children[1].innerHTML) - timeToMinutes(gridElement.children[i].children[2].innerHTML);
		}
		/* intervalos = [1, 2, 2, 10, 22, 65, 0]; // para testes*/
		intervalos = intervalos.sort(function(a, b){return b - a;});
		maxInterval = intervalos[0];

		if(maxInterval >= considerar_almoco){
			intervalos.shift();
			almoco = 0;
		}

		retirarValor = intervalos.reduce((accumulator, currentValue) => 
				currentValue <= 2 ? accumulator + currentValue : accumulator
			, 0);
		

		console.log('horaEntrada: ' + minutesToTime(horaEntrada));
		console.log('horas dia: '+ minutesToTime(horasDia));
		console.log('totalTrabalhado: '+ minutesToTime(totalTrabalhado));
		console.log('retirarValor: '+ minutesToTime(retirarValor));
		console.log('almoco: '+ minutesToTime(almoco));
		console.log('horaAtual: '+ minutesToTime(horaAtual));
		
        window.alert('Faltam ' + (minutesToTime(horasDia - totalTrabalhado - retirarValor + almoco)) + ' para ir embora.\n' 
                    + 'Horário de saída: ' + minutesToTime(horaAtual + horasDia - totalTrabalhado - retirarValor + almoco));
	
	}
};

function timeToMinutes(time) {
	var hora = Number(time.substring(0, 2));
	var minutos = Number(time.substring(3, 5));
	return (hora * 60) + minutos;
};

function minutesToTime(minutes) {
	var hora = Math.trunc(minutes / 60).toString().length == 1 ? '0' + Math.trunc(minutes / 60) : Math.trunc(minutes / 60).toString();
	var minutos = (minutes % 60).toString().length == 1 ? '0' + (minutes % 60) : (minutes % 60).toString();
	return hora + ':' + minutos;
};

function getHoraAtual(considera_horario_de_verao) {
	let date = new Date();
	if(considera_horario_de_verao){
		return (date.getHours() * 60) + date.getMinutes();
	}else{
		return ((date.getHours()-1) * 60) + date.getMinutes();
	}
};

function toTeste() {
	document.getElementsByClassName('slick-cell lr l1 r1 tk-date-cell disabled')[document.getElementsByClassName('slick-cell lr l1 r1 tk-date-cell disabled').length - 1].click();
	calculaHora(document.getElementById('win_int00018_000:tab_int00018_000_001:grid').getElementsByClassName('slick-viewport')[0].getElementsByClassName('grid-canvas')[0]);
};

if (document.getElementsByClassName('slick-cell lr l1 r1 tk-date-cell disabled')[document.getElementsByClassName('slick-cell lr l1 r1 tk-date-cell disabled').length - 1] != undefined) {
    if (document.getElementsByClassName('ui-dialog ui-widget ui-widget-content ui-corner-all ui-draggable')[0] != undefined) {
        document.getElementById('win_int_sessao_expirou:tab_int_sessao_expirou:senha').value = pass;
        document.getElementById('win_int_sessao_expirou:tab_int_sessao_expirou:confirm').click();
        document.getElementById('win_int00018_000:tab_int00018_000_000:tk_reload_filter').getElementsByClassName('actionButton')[0].click();
        setTimeout(function () {
            document.getElementsByClassName('slick-cell lr l1 r1 tk-date-cell disabled')[document.getElementsByClassName('slick-cell lr l1 r1 tk-date-cell disabled').length - 1].click();
            setTimeout(function () {
                calculaHora(document.getElementById('win_int00018_000:tab_int00018_000_001:grid').getElementsByClassName('slick-viewport')[0].getElementsByClassName('grid-canvas')[0]);
            }, 4000);
        }, 3000);
    } else {
        document.getElementById('win_int00018_000:tab_int00018_000_000:tk_reload_filter').getElementsByClassName('actionButton')[0].click();
        setTimeout(function () {
            document.getElementsByClassName('slick-cell lr l1 r1 tk-date-cell disabled')[document.getElementsByClassName('slick-cell lr l1 r1 tk-date-cell disabled').length - 1].click();
            setTimeout(function () {
                calculaHora(document.getElementById('win_int00018_000:tab_int00018_000_001:grid').getElementsByClassName('slick-viewport')[0].getElementsByClassName('grid-canvas')[0]);
            }, 2000);
        }, 1750);
    }
} else {
    login(usuario, pass);
}
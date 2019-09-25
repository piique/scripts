/* 
    Script para calcular a hora de ir embora.
    Para que functione é necessário entrar na pádina do intranet e colocar usuario e senha.
    Após isso, rodar o scrip e esperar para que o trabalho seja feito.
    Criado inicialmente para CLT's -> futuras implementações para estagiário.

    Pedro Valverde
*/

var usuario = 'pedrovalverde';
var pass = 'teknisa2';

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
    let horario_base = '09:00';
    let horas_por_dia = '08:00';
    let horaAtual = getHoraAtual();
    let horasDia = timeToMinutes(horas_por_dia);
    var horaEntrada = timeToMinutes(gridElement.children[0].children[1].innerHTML);
    var totalTrabalhado = 0;

    horario_base = timeToMinutes(horario_base);

    if (horaEntrada < horario_base - 5) {
        totalTrabalhado += -((horario_base - 5) - horaEntrada);
        horaEntrada = horario_base - 5;
    }

    if (gridElement.childElementCount == 1) {
        window.alert('Faltam ' + (minutesToTime(horasDia - (horaAtual - horaEntrada) + 60)) + ' para ir embora.\n' +
            'Horário de saída: ' + (minutesToTime(horasDia - (horaAtual - horaEntrada) + 60 + horaAtual)));
    } else if (gridElement.childElementCount >= 3) {
        let ultimaEntrada = timeToMinutes(gridElement.children[gridElement.childElementCount - 2].children[1].innerHTML);
        totalTrabalhado += horaAtual - ultimaEntrada + timeToMinutes(gridElement.children[gridElement.childElementCount - 1].children[gridElement.children[gridElement.childElementCount - 1].childElementCount - 1].innerHTML);

        var intervalos = [];
        var qtdIntervalos = gridElement.childElementCount - 2;
        var retirarValor = 0;
        let almoco = 60;

        var maiorIntervalo = 0;

        for (let i = 0; i < qtdIntervalos; i++) {
            saida = timeToMinutes(gridElement.children[i].children[2].innerHTML);
            entrada = timeToMinutes(gridElement.children[i + 1].children[1].innerHTML);
            intervalos[i] = entrada - saida;
            if (intervalos[i] > maiorIntervalo) {
                maiorIntervalo = [intervalo, i];
            }
            if (intervalos[i] <= 2) {
                totalTrabalhado += intervalo;
            }
        }

        if (maiorIntervalo[0] > 30) {
            almoco = 0;
        }

        window.alert('Faltam ' + (minutesToTime(horasDia - totalTrabalhado - retirarValor + almoco)) + ' para ir embora.\n' +
            'Horário de saída: ' + (minutesToTime(horaAtual + (horasDia - totalTrabalhado) - retirarValor + almoco)));
    }
};

function timeToMinutes(time) {
    var hora = Number(time.substring(0, 2));
    var minutos = Number(time.substring(3, 5));

    return (hora * 60) + minutos;
};

function minutesToTime(minutes) {
    z
    var hora = Math.trunc(minutes / 60).toString().length == 1 ? '0' + Math.trunc(minutes / 60) : Math.trunc(minutes / 60).toString();
    var minutos = (minutes % 60).toString().length == 1 ? '0' + (minutes % 60) : (minutes % 60).toString();

    return hora + ':' + minutos;
};

function getHoraAtual() {
    let date = new Date();
    return (date.getHours() * 60) + date.getMinutes();
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
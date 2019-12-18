/*

    Script para buscar nos módulos todas as telas a partir do arquivo de menu.
    Relaciona submodulo, código e nome. 

*/
const fs = require('fs');
console.log('Iniciando...\n\n');
// console.time("timer");
var x = 'teste';

function telas (e, y = []){
    e.forEach((el)=>{
            if(el.menus){
                telas(el.menus, y);
            }else{
                y.push(`${el.label} =====> ${el.windowName}`);
            }
        });
    return y.join('\n');
}

fs.readFile("./files/menu.json", function (err, data) {
    if(err)
        return err;
    data = JSON.parse(data);
    conteudo = telas(data, []);
    fs.writeFileSync("./files/nomes_telas.txt", conteudo);

    // console.timeEnd("timer");
    console.log("Telas: \n" + conteudo);
    console.log("\n\nFinalizado");
});


# encoding: utf-8
# encoding: iso-8859-1
# encoding: win-1252
# path = "../tecfood/modules/cadGes/mobile/bower_components/zeedhi-frontend/assets/dist/main.js"
import os
path = "main.js"
linha_to_find = "window.name = 'NG_ENABLE_DEBUG_INFO!' + window.name;"
nova_linha = 'window.name = "NG_ENABLE_DEBUG_INFO!" + window.name;\n'

def exeptionFilter(module):
    if(module == 'teknisa' or module == 'login' or module == 'acl'):
        return False
    else:
        return True

def alterar_linha(path,linha_to_find,nova_linha, module, check):
    aux = -1
    teve_modificacao = False
    try:
        with open(path,'r') as f:
            texto=f.readlines()
        with open(path,'w') as f:
            for index, i in enumerate(texto):
                if i.find(linha_to_find) != -1 and aux == -1:
                    aux = index+3
                    f.write(i)
                elif index == aux and i.find('}') == -1 and i.find(nova_linha) == -1:
                    teve_modificacao = True
                    f.write(nova_linha)
                else:
                    f.write(i)
        if teve_modificacao == 1:
            print module.ljust(8) + 'alterado'
        else:
            print module.ljust(8) + 'não precisa de alteração'
    except:
        if (check != 't'):
            raise ValueError("")
        else:
            print module.ljust(8) + 'arquivo main.js não encontrado em ' + path

def main(module):
    while True:
        try:
            if module == 'tecfood': 
                path = "../tecfood/mobile/bower_components/zeedhi-frontend/assets/dist/main.js"
                alterar_linha(path,linha_to_find,nova_linha, module, '')

            elif module == '1' or module == 'exit' or module == 'exit()':
                break
                exit()
            elif module.lower() == 't':
                path = "../tecfood/mobile/bower_components/zeedhi-frontend/assets/dist/main.js"
                module = 'tecfood'
                alterar_linha(path,linha_to_find,nova_linha, module, '')
                os.chdir('../tecfood/modules/')
                # all_modules = [d for d in os.listdir('.') if os.path.isdir(d)]
                # all_modules = list(filter(exeptionFilter, all_modules))
                all_modules = list(filter(exeptionFilter, [d for d in os.listdir('.') if os.path.isdir(d)]))
                for m in all_modules:
                    path = "./" + m + "/mobile/bower_components/zeedhi-frontend/assets/dist/main.js"
                    alterar_linha(path,linha_to_find,nova_linha, m, 't')
                # break
                # exit()
            else:
                path = "../tecfood/modules/" + module + "/mobile/bower_components/zeedhi-frontend/assets/dist/main.js"
                alterar_linha(path,linha_to_find,nova_linha, module, '')
                # break
                # exit()

            print 'Script finalizado'
            break
        except:
            module = raw_input ("Oop! Módulo inválido. Tente novamente...\nMódulo: ")

module = raw_input("Qual módulo deseja ativar o debugInfo? \n T - para todos os módulos\n Módulo: ")
main(module)

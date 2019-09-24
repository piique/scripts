echo "Escolha uma das bases a seguir: "
echo "1 - DRO               - 192.168.120.140"
echo "2 - BROWSER_TECFOOD   - 192.168.122.155"
read p

if [ $p -eq 1 ]
then
    cat files/base/DRO/devEnvironment.json > ../tecfood/mobile/config/devEnvironment.json
    cat files/base/DRO/db.xml > ../tecfood/backend/config/db.xml
    echo "Base alterada pra 192.168.120.140 - DRO"
elif [ $p -eq 2 ]
then
    cat files/base/MANA/devEnvironment.json > ../tecfood/mobile/config/devEnvironment.json
    cat files/base/MANA/db.xml > ../tecfood/backend/config/db.xml
    echo "Base alterada pra 192.168.122.155 - BROWSER_TECFOOD"
else
    echo "Valor informado inválido"
fi
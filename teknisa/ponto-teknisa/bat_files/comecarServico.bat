@REM volta uma pasta para pegar versao correta do node js
cd ..

@REM abre e loga na VPN
@REM tutorial: https://www.ovpn.com/en/blog/windows-run-openvpn-automatically-on-computer-startup
start C:\"Program Files"\OpenVPN\bin\openvpn-gui.exe --connect "pfSense-UDP4-7795-CERTIFICADO_OPEN-VPN-USUARIO-config.ovpn"

@REM roda script para bater ponto
node D:\workfolder\scripts\teknisa\ponto-teknisa\src\entrar.js

@REM inicia docker
docker start teknisa-container

exit

@REM volta uma pasta para pegar versao correta do node js
cd ..

@REM roda script
node D:\workfolder\scripts\teknisa\ponto-teknisa\src\sair.js

@REM fechar VPN
taskkill /F /IM openvpn-gui.exe

@REM fecha janela CMD
exit

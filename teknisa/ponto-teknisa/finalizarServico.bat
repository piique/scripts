cd ..

@REM roda script
node D:\workfolder\scripts\ponto-teknisa\sair.js

@REM fechar VPN
taskkill /F /IM openvpn-gui.exe

@REM fecha janela CMD
exit

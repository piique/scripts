/*
  Script created to enter easily into to discord's call server

  Created by: piique
*/

javascript:

/*
  Ex: Suprimentos: <a data-list-item-id="channels___878341932420583515" > </a>
*/
let dataListItemId = "channels___878341932420583515";

var channelsList = document.getElementsByClassName("wrapper-1BJsBx");
for (let channel of channelsList) {
    if(channel.dataset.listItemId === "guildsnav___689934924408815660"){
        channel.click();
    }
}

setTimeout(() => {
    var voicesChats = document.getElementsByClassName("mainContent-u_9PKf");
    for(let voiceChat of voicesChats){
        voiceChat.scrollIntoView();
    }
    setTimeout(() => {
        for(let voiceChat of voicesChats){
            if(voiceChat?.dataset?.listItemId === dataListItemId){
                voiceChat.click();
                voiceChat.scrollIntoView();
            }
        }
    }, 1000);    
}, 3000);

setTimeout(() => {
    let index = document.getElementsByClassName('button-14-BFJ').length === 3 ? 0 : 1;
    let muteButton = document.getElementsByClassName('button-14-BFJ')[index];
    if(muteButton.ariaChecked != "true"){
        muteButton.click();
    }
}, 4000);
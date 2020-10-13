"use strict";

function ShortCut(e){
    var isChanged = true;
    var sendEvent = {
        target: {}
    };
    
    switch(e.key){
        case "q":
            if(inputs[0].checked === true){
                var checkedTmp = !AutoUnit.GetPxDetail();
                sendEvent.target = {
                    checked: checkedTmp
                };
                document.getElementById("pxDetail").checked = checkedTmp;
                SetNowPxDetail(sendEvent);
            }
            else{
                inputs[0].checked = true;
                sendEvent.target = inputs[0];
                SetNowUnit(sendEvent);
            }
            break;
        case "w":
            inputs[1].checked = true;
            sendEvent.target = inputs[1];
            SetNowUnit(sendEvent);
            break;
        case "a":
            inputs[2].checked = true;
            sendEvent.target = inputs[2];
            SetNowUnit(sendEvent);
            break;
        case "s":
            inputs[3].checked = true;
            sendEvent.target = inputs[3];
            SetNowUnit(sendEvent);
            break;
        case "z":
            inputs[4].checked = true;
            sendEvent.target = inputs[4];
            SetNowUnit(sendEvent);
            break;
        case "x":
            inputs[5].checked = true;
            sendEvent.target = inputs[5];
            SetNowUnit(sendEvent);
            break;
        case "b":
            inputs[6].select();
            break;
        case "r":
            inputs[7].select();
            break;
        case "t":
            inputs[8].select();
            break;
        case "Enter":
            SetNowResult();
            break;
        default:
            isChanged = false;
            break;
    }
    if(isChanged) e.preventDefault();
}

function OnlyNumber(e){
    e.target.value = e.target.value.replace(/[ㄱ-힣]*/g,"");
    switch(e.key){
        case ".":
            if(e.target.value.split(".").length >= 2){
                e.preventDefault();
            }
            break;
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        case "ArrowLeft":
        case "ArrowRight":
        case "ArrowUp":
        case "ArrowDown":
        case "Backspace":
        case "Tab":
            break;
        default:
            e.preventDefault();
            break;
    }
}
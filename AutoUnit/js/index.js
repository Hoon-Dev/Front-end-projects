"use strict";

var popup = document.getElementById("autounit-data-popup");

var inputs = document.querySelectorAll(".form input");

var autoUnitContents = document.querySelectorAll("#autounit .content"),
    inputForm = autoUnitContents[1].querySelector(".form"),
    resultText = autoUnitContents[2].querySelector("span:nth-child(2)"),
    historyList = autoUnitContents[3].querySelector("#history ul"),
    historyListItems = historyList.querySelectorAll("li");

function __debug__(){
    console.dir(inputs);
    console.dir(autoUnitContents);
}

function Init(){
    document.getElementById("pxDetail").addEventListener("click",SetNowPxDetail);
    
    document.addEventListener("keydown",ShortCut);
    
    for(var i=0;i<6;i++){
        inputs[i].addEventListener("click",SetNowUnit);
    }
    
    for(var i=6;i<9;i++){
        inputs[i].addEventListener("keydown",OnlyNumber);
        inputs[i].addEventListener("keyup",OnlyNumber);
    }
    
    inputs[9].addEventListener("click",SetNowResult);
}

window.onload = function(){
    Init();
    if(CheckPrevData()){
        var popup = document.getElementById("autounit-data-popup");
        
        popup.classList.add("open");
        popup.querySelectorAll("input")[0].addEventListener("click",AutoUnit.Load);
        popup.querySelectorAll("input")[1].addEventListener("click",function(e){
            popup.className="";
        });
    }
    else{
        AutoUnit.AddHistory();
    }
//    __debug__();
}

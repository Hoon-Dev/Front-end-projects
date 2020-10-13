"use strict";

function SetNowPxDetail(e){
    var nowPxDetail = e.target.checked;
    AutoUnit.SetPxDetail(nowPxDetail);
    
    if(nowPxDetail === true){
        nowPxDetail = "px-1";
    }
    else{
        nowPxDetail = "px-2";
    }
    
    inputForm.className = "form";
    inputForm.classList.add(nowPxDetail);
    AutoUnit.SetUnit(nowPxDetail);
}

function SetNowUnit(e){
    var unitString = e.target.id;
    
    if(unitString === "px"){
        var sendEvent = {
            target:{
                checked: AutoUnit.GetPxDetail()
            }
        };
        SetNowPxDetail(sendEvent);
    }
    else{
        inputForm.className = "form";
        inputForm.classList.add(unitString);
        AutoUnit.SetUnit(unitString);
    }
}

function SetNowInput(){
    AutoUnit.SetBaseValue(parseFloat(inputs[6].value));
    AutoUnit.SetRootValue(parseFloat(inputs[7].value));
    AutoUnit.SetTranslateValue(parseFloat(inputs[8].value));
}

function SetNowResult(e){
    SetNowInput();
    
    var resultTmp = "0";
    
    switch(AutoUnit.GetUnit()){
        case "px-1":
            resultTmp =
                AutoUnit.GetBaseValue()*(AutoUnit.GetTranslateValue()/100) + "";
            break;
        case "px-2":
            resultTmp =
                AutoUnit.GetRootValue()*AutoUnit.GetTranslateValue() + "";
            break;
        case "vw":
            resultTmp =
                (AutoUnit.GetTranslateValue()/AutoUnit.GetBaseValue()) * 100 + "";
            break;
        case "vh":
            resultTmp =
                (AutoUnit.GetTranslateValue()/AutoUnit.GetBaseValue()) * 100 + "";
            break;
        case "rem":
            resultTmp =
                AutoUnit.GetTranslateValue()/AutoUnit.GetRootValue() + "";
            break;
        case "em":
            resultTmp =
                AutoUnit.GetTranslateValue()/AutoUnit.GetRootValue() + "";
            break;
        case "per":
            resultTmp =
                (AutoUnit.GetTranslateValue()/AutoUnit.GetBaseValue()) * 100 + "";
            break;
    }
    
    var pointCutter = resultTmp.match(/([0-9]+\.[0-9]{3})/g);
    if(pointCutter != null){
        resultTmp = pointCutter[0];
    }
    
    resultText.textContent = resultTmp;
    AutoUnit.SetResult(parseFloat(resultTmp));
    AutoUnit.AddHistory();
}

function SelectHistory(e){
    if(e.target.nodeName === "LI"){
        AutoUnit.Now(parseInt(e.target.getAttribute("index")));
    }
    else{
        AutoUnit.RemoveHistory(e);
    }
}
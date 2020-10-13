(function(){
    "use strict";
    
    var pannelSpans = document.querySelectorAll("#pannel span"),
        inputStackText = pannelSpans[0],
        inputText = pannelSpans[1];

    var topButtons = document.querySelectorAll(".btnTop button");
    var numberButtons = document.querySelectorAll(".btnNumber button");
    var operatorButtons = document.querySelectorAll(".btnOperator button");

    var resultState = false;
    var operatorCanInput = false;
    var pointCanInput = true;

    function CalcResult(){
        inputText.textContent = eval(inputStackText.textContent);
        resultState = true;
    }

    function TopButton(e){
        if(e.target.textContent==="CE"){
            inputText.textContent = "";
        }
        else{
            inputText.textContent = "";
            inputStackText.textContent = "";
            operatorCanInput = false;
            resultState = false;
        }
    }

    function NumberButton(e){
        if(resultState === true){
            inputStackText.textContent = "";
            inputText.textContent = "";
            resultState = false;
        }
        if(e.target.textContent === "."){
            if(inputText.textContent.length > 0 && pointCanInput === true){
                inputText.textContent = inputText.textContent + ".";
                pointCanInput = false;
                operatorCanInput = false;
            }
        }
        else{
            var parseResult = parseFloat(inputText.textContent + e.target.textContent);
            if(parseResult!=Infinity){
                inputText.textContent = parseResult;
            }
            operatorCanInput = true;
        }
    }

    function OperatorButton(e){
        var operator = e.target.textContent;

        if(operatorCanInput === true){
            if(operator === "="){
                inputStackText.textContent = inputStackText.textContent +
                    inputText.textContent;
                CalcResult();
                operatorCanInput = false;
            }
            else if(operator === "Backspace"){
                inputText.textContent = 
                    inputText.textContent.slice(0,Math.max(0,inputText.textContent.length-1));
            }
            else{
                inputStackText.textContent = inputStackText.textContent +
                    inputText.textContent + operator;
                inputText.textContent = "";
                operatorCanInput = false;
            }
            pointCanInput = true;
        }
        else if(resultState === true){
            if(operator === "Backspace"){
                inputStackText.textContent = "";
                inputText.textContent = 
                    inputText.textContent.slice(0,Math.max(0,inputText.textContent.length-1));
                operatorCanInput = true;
                resultState = false;
            }
            else if(operator != "="){
                inputStackText.textContent = "";
                inputStackText.textContent = inputText.textContent + operator;
                inputText.textContent = "";
                resultState = false;
            }
        }
    }

    function Init(){
        document.body.addEventListener("keydown",function(e){
            e.preventDefault();
            var key = e.key;
            var sendEvent = {
                target : {
                    textContent : "="
                }
            };
            if(((key >= 0 && key <= 9) || key ===".") && (key != " ")){
                sendEvent.target.textContent = key;
                NumberButton(sendEvent);
            }
            else{
                switch(key){
                    case "-":
                    case "+":
                    case "*":
                    case "/":
                    case "Backspace":
                        sendEvent.target.textContent = key;
                        OperatorButton(sendEvent);
                        break;
                    case "=":
                    case "Enter":
                        sendEvent.target.textContent = "=";
                        OperatorButton(sendEvent);
                        break;
                    case "Escape":
                        sendEvent.target.textContent = "C";
                        TopButton(sendEvent);
                        break;
                    default:
                        break;
                }
            }
        });
        for(var i=0;i<topButtons.length;i++){
            topButtons[i].addEventListener("click",TopButton);
        }
        for(var i=0;i<numberButtons.length;i++){
            numberButtons[i].addEventListener("click",NumberButton);
        }
        for(var i=0;i<operatorButtons.length;i++){
            operatorButtons[i].addEventListener("click",OperatorButton);
        }
        var toggle = document.getElementById("calcToggle");
        toggle.addEventListener("click",function(e){
            toggle.classList.toggle("canUp");
            document.getElementById("calculator").classList.toggle("upped");
        });
    }

    window.onload = Init;
})();
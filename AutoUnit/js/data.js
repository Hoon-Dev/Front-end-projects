"use strict";

function AutoUnitData(unit, pxDetail, baseValue,
                      rootValue, translateValue, result){
    this.unit = unit;
    this.pxDetail = pxDetail;
    this.baseValue = baseValue;
    this.rootValue = rootValue;
    this.translateValue = translateValue;
    this.result = result;
    
    this.Copy = function(){
        return new AutoUnitData(this.unit, this.pxDetail, this.baseValue,
                                this.rootValue, this.translateValue, this.result);
    }
}

var AutoUnit = (function(){
    var nowData = new AutoUnitData("px-1", true, 1920, 100, 100, 1920);
    
    var historyData = (function(){
        var data = [{},{},{},{},{},{}];
        var nowPivot = 0;
        var latestPivot = -1;
        var size = 0;
        
        var DATA_LENGTH = 6;
        
        return {
            Push : function(){
                if(size != 0) historyListItems[latestPivot].className = ""; // 데이터가 있어야 이전 값의 클래스를 지웁니다.
                
                var item = historyListItems[nowPivot];
                if(size != DATA_LENGTH && ((size-1) === latestPivot)){ // 데이터가 꽉차있지 않으면 생성 합니다.
                    item = document.createElement("li");
                    item.addEventListener("click", SelectHistory);
                }
                
                item.setAttribute("index", nowPivot);
                var unit = (nowData.unit === "per") ? ("%") : (nowData.unit.split("-")[0].toUpperCase());
                item.setAttribute("data", nowData.result + " " + unit);
                item.classList.add("latest");
                
                if(size != DATA_LENGTH && ((size-1) === latestPivot)){ // 데이터가 꽉차있지 않으면 생성 합니다.
                    var span = document.createElement("span");
                    item.appendChild(span);
                    historyList.appendChild(item);
                }
                historyListItems = historyList.querySelectorAll("li"); // 노드를 갱신 합니다.
                
                latestPivot = nowPivot;
                data[nowPivot++] = nowData.Copy(); // 실제 데이터 추가
                
                if(nowPivot === (DATA_LENGTH)) nowPivot = 0;
                if(size != DATA_LENGTH && (size < (latestPivot+1))) size++;
            },
            Pop : function(e){
                var index = parseInt(e.target.parentNode.getAttribute("index"));
                
                historyList.removeChild(e.target.parentNode);
                historyListItems = historyList.querySelectorAll("li"); // 노드를 갱신 합니다.
                
                var indexPointer = index;

                for(; indexPointer<(size-1); indexPointer++){
                    data[indexPointer] = data[indexPointer+1];
                    historyListItems[indexPointer].setAttribute("index", indexPointer);
                }
                data[indexPointer] = {};
                
                if(index < latestPivot){ // 선택자보다 우측에 아이템을 삭제 할 경우
                    latestPivot--;
                    nowPivot--;
                    size--;
                    if(nowPivot < 0){
                        nowPivot = size;
                    }
                }
                else if(index === latestPivot){ // 선택자를 삭제 할 경우
                    size--;
                    if(latestPivot === 0){
                        latestPivot = (size-1);
                        nowPivot = size;
                    }
                    else if(nowPivot === 0){
                        latestPivot--;
                        nowPivot = size;
                    }
                    else{
                        latestPivot--;
                        nowPivot--;
                    }
                    if(latestPivot != -1){
                        historyData.SetState(latestPivot);
                        historyListItems[latestPivot].classList.add("latest");
                    }
                }
                else{
                    size--;
                }
            },
            
            GetLatestPivot : function(){
                return latestPivot;  
            },
            SetLatestPivot : function(index){
                latestPivot = index;
            },
            SetNowPivot : function(pivot){
                nowPivot = pivot;
            },
            
            GetState : function(){
                return JSON.stringify({
                    nowPivot : nowPivot,
                    latestPivot : latestPivot,
                    size : size
                });
            },
            SetState : function(index){
                nowData.unit = data[index].unit;
                nowData.pxDetail = data[index].pxDetail;
                nowData.baseValue = data[index].baseValue;
                nowData.rootValue = data[index].rootValue;
                nowData.translateValue = data[index].translateValue;
                nowData.result = data[index].result;
                
                inputs[6].value = data[index].baseValue;
                inputs[7].value = data[index].rootValue;
                inputs[8].value = data[index].translateValue;
                    
                var unitToIndex = {
                    "px-1" : 0,
                    "px-2" : 0,
                    "vw" : 1,
                    "vh" : 2,
                    "rem" : 3,
                    "em" : 4,
                    "per" : 5
                };
                
                var sendEvent = {
                    target: {
                        checked: data[index].pxDetail
                    }
                };
                document.getElementById("pxDetail").checked = sendEvent.target.checked;
                SetNowPxDetail(sendEvent);
                
                inputs[unitToIndex[data[index].unit]].click();
                
                resultText.textContent = data[index].result;
//                if(latestPivot != -1)
//                    historyListItems[latestPivot].className = "";
//                
//                latestPivot = index;
//                
//                if(latestPivot === 5) nowPivot = 0;
//                else nowPivot = latestPivot + 1;
//                
//                historyListItems[latestPivot].classList.add("latest");
                
            },
            GetData : function(){
                return JSON.stringify(data);
            },
            
            Initialize : function(state, history){
                if(size > 0 || (history[0].hasOwnProperty("unit") === false)) return; 

                nowPivot = state.nowPivot;
                latestPivot = state.latestPivot;
                size = state.size;
                
                data = history;
                                
                var docFrag = document.createDocumentFragment();
                var listTmp, unit, span;
                
                for(var i=0;i<size;i++){
                    listTmp = document.createElement("li");
                    listTmp.setAttribute("index",i);
                    unit = (data[i].unit === "per") ? ("%") : (data[i].unit.split("-")[0].toUpperCase());
                    listTmp.setAttribute("data", data[i].result + " " + unit);
                    listTmp.addEventListener("click", SelectHistory);
                    
                    span = document.createElement("span");
                    listTmp.appendChild(span);
                    
                    if(i === latestPivot) listTmp.classList.add("latest");
                    
                    docFrag.appendChild(listTmp);
                }
                historyList.appendChild(docFrag);
                historyListItems = historyList.querySelectorAll("li");
                
                historyData.SetState(latestPivot);
            }
        };
    })();
    
    return {
        GetUnit : function(){
            return nowData.unit.toString();
        },
        SetUnit : function(unit){
            nowData.unit = unit;
        },
        
        GetPxDetail : function(){
            return nowData.pxDetail;  
        },
        SetPxDetail : function(pxDetail){
            nowData.pxDetail = pxDetail;
        },
        
        GetBaseValue : function(){
            return nowData.baseValue;
        },
        SetBaseValue : function(baseValue){
            nowData.baseValue = baseValue;
        },
        
        GetRootValue : function(){
            return nowData.rootValue;
        },
        SetRootValue : function(rootValue){
            nowData.rootValue = rootValue;
        },
        
        GetTranslateValue : function(){
            return nowData.translateValue;
        },
        SetTranslateValue : function(translateValue){
            nowData.translateValue = translateValue;
        },
        
        SetResult : function(result){
            nowData.result = result
        },
        
        AddHistory : function(){
            historyData.Push();
            AutoUnit.Save();
            
            var copyTmp = document.createElement("textarea");
            copyTmp.value = nowData.result;
            document.body.appendChild(copyTmp);
            copyTmp.select();
            document.execCommand("copy");
            document.body.removeChild(copyTmp);
        },
        RemoveHistory : function(e){
            historyData.Pop(e);
            AutoUnit.Save();
        },
        
        Save : function(){
            localStorage.setItem("State", historyData.GetState());
            localStorage.setItem("History", historyData.GetData());
        },
        Load : function(e){
            popup.className = "";
            historyData.Initialize(JSON.parse(localStorage.getItem("State")),
                                   JSON.parse(localStorage.getItem("History")));
        },
        
        Now : function(index){
            var latestPivot = historyData.GetLatestPivot();
            
            if(latestPivot != -1) historyListItems[latestPivot].className = "";
            
            historyData.SetState(index);
            historyData.SetLatestPivot(index);
            
            if(index === 5) historyData.SetNowPivot(0);
            else historyData.SetNowPivot(index+1);
            
            historyListItems[index].classList.add("latest");
//            if()
        }
    };
})();


function CheckPrevData(){
    if(localStorage != undefined){
        return (JSON.parse(localStorage.getItem("History"))[0].hasOwnProperty("unit") === false) ? (false) : (true);
    }
}
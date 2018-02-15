/*
 * 创建一个包含所有卡片的数组
 */
function Card (picture) {
    this.picture = picture;
}
var cardArray = [new Card("fa fa-diamond"), new Card("fa fa-paper-plane-o"), new Card("fa fa-cube"), 
new Card("fa fa-anchor"), new Card("fa fa-bolt"), new Card("fa fa-cube"), new Card("fa fa-anchor"), 
new Card("fa fa-leaf"), new Card("fa fa-bicycle"), new Card("fa fa-diamond"), new Card("fa fa-bomb"), 
new Card("fa fa-leaf"), new Card("fa fa-bomb"), new Card("fa fa-bolt"), new Card("fa fa-bicycle"),
new Card("fa fa-paper-plane-o"),];


/*
 * 显示页面上的卡片
 *   - 使用下面提供的 "shuffle" 方法对数组中的卡片进行洗牌
 *   - 循环遍历每张卡片，创建其 HTML
 *   - 将每张卡的 HTML 添加到页面
 */

// 洗牌函数来自于 http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * 设置一张卡片的事件监听器。 如果该卡片被点击：
 *  - 显示卡片的符号（将这个功能放在你从这个函数中调用的另一个函数中）
 *  - 将卡片添加到状态为 “open” 的 *数组* 中（将这个功能放在你从这个函数中调用的另一个函数中）
 *  - 如果数组中已有另一张卡，请检查两张卡片是否匹配
 *    + 如果卡片匹配，将卡片锁定为 "open" 状态（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 如果卡片不匹配，请将卡片从数组中移除并隐藏卡片的符号（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 增加移动计数器并将其显示在页面上（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 如果所有卡都匹配，则显示带有最终分数的消息（将这个功能放在你从这个函数中调用的另一个函数中）
 */

 var open = [ ];
 var moves = 0; //记录一局有多少个moves
 var numOfBox = document.getElementById("deck").getElementsByTagName("li");
 var star = document.getElementById("stars").getElementsByTagName("li");
 
 //初始化整个游戏格
 function inital(){
    //在restart时要重置moves和open[]
    open = [ ];
    moves = 0;
    document.getElementById("moves").innerHTML = moves;

    for (var i = 0; i < star.length; i++) {
        star[i].innerHTML = "<i class='fa fa-star'></i>";
    }
                                        
    for (var i = 0; i < numOfBox.length; i++) {
        numOfBox[i].className = "card";
        numOfBox[i].innerHTML = "<i class='" + cardArray[i].picture + "'></i>";
    }
    shuffle(cardArray);

}

//重置游戏
function restart(){
    document.getElementById("restart").onclick = inital;
}


function click(){
    for (var i = 0; i < numOfBox.length; i++) {
        numOfBox[i].onclick = function(i) {
            return function(){
                if (numOfBox[i].className == "card") { //确保只点击那些未翻转的卡片，已经match的卡片就不提供点击功能了

                    numOfBox[i].className = "card open show";
                    /*点击卡片时，都会将该卡片的index push到open中*/
                    open.push(i);
                    numOfMoves();
                    isMatched();

                }else {
                    return;
                }
            }
             
        }(i);
    }

}

//判断连续点击的两个卡牌是否match
function isMatched(){
    /*save1,save2存的是刚刚push进open的两个index，因为后面若这两个不match的时候open力度东西pop出来，
    就找不到他们两个的index把他们样式再翻转回去了*/
    var save1;
    var save2;
    var isMatch = 0;
    if (open.length % 2 == 0){
        if (numOfBox[open[open.length-1]].innerHTML != numOfBox[open[open.length-2]].innerHTML) {
            save1 = open.pop();
            save2 = open.pop();

        }
        else {
            save1 = open[open.length - 1];
            save2 = open[open.length - 2];
            isMatch = 1;
        }
        /*判断最新的两个index所对应的卡片的团是不是一样的，如果是一样的就改变他们的class为“card match”,
        以改变他们的样式，不一样，就让他们保持“card”.*/
        setTimeout(function() {
            if (isMatch == 0){
                numOfBox[save1].className = "card";
                numOfBox[save2].className = "card";
            }else{
                numOfBox[save1].className = "card match";
                numOfBox[save2].className = "card match";
            }
            starNum();//查看需不需要更新star的数量
            succed();//查看游戏是否成功结束了
        },1000);
    }

}

//计数试图配对的moves数量
function numOfMoves(){
     if (open.length % 2 == 0){
                        moves += 1;
                        document.getElementById("moves").innerHTML = moves;
    }
}

function succed(){
    if (open.length == 16)
        setTimeout(function(){
            alert("you win with " + moves +" moves!");
        },500);
}

//根据moves多少显示星级
var star = document.getElementById("stars").getElementsByTagName("li");
function starNum(){
    if (moves > 10 && moves < 15){
         star[2].innerHTML = "<i class='fa fa-star-o'></i>";
     }
     else if (moves >=15 && moves < 20){
        star[1].innerHTML = "<i class='fa fa-star-o'></i>";     
    }
}

window.onload = function () {
    inital();
    click();
    restart();
}


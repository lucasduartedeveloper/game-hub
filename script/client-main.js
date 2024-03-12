var uploadAlert = new Audio("audio/ui-audio/upload-alert.wav");
var warningBeep = new Audio("audio/warning_beep.wav");

var sw = 360; //window.innerWidth;
var sh = 669; //window.innerHeight;
var swo = sw-100;

var gridSize = 10;

if (window.innerWidth > window.innerHeight) {
    sw = window.innerWidth;
    sh = window.innerHeight;
    gridSize = 20;
}

var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
if (urlParams.has("height"))
sh = parseInt(urlParams.get("height"));

var audioBot = true;
var playerId = new Date().getTime();

var canvasBackgroundColor = "rgba(255,255,255,1)";
var backgroundColor = "rgba(50,50,65,1)";
var buttonColor = "rgba(75,75,90,1)";

var audioStream = 
new Audio("audio/music/ringtone-0.wav");

// Botão de gravação
$(document).ready(function() {
    $("html, body").css("overscroll-behavior", "none");
    $("html, body").css("overflow", "hidden");
    $("html, body").css("background", "#fff");

    $("#title").css("font-size", "15px");
    $("#title").css("color", "#fff");
    $("#title").css("top", "10px");
    $("#title").css("z-index", "25");

    $("#title")[0].innerText = ""; //"PICTURE DATABASE"; 

    tileSize = (sw/7);

    pictureView = document.createElement("canvas");
    pictureView.style.position = "absolute";
    pictureView.style.background = "#334";
    pictureView.width = (sw);
    pictureView.height = (sh); 
    pictureView.style.left = (0)+"px";
    pictureView.style.top = (0)+"px";
    pictureView.style.width = (sw)+"px";
    pictureView.style.height = (sh)+"px";
    pictureView.style.zIndex = "15";
    document.body.appendChild(pictureView);

    cards = [];
    for (var n = 0; n < 20; n++) {
        var obj = {
            n: Math.floor(n/2),
            flipped: true
        };
        cards.push(obj);
    }
    cards.sort(function(a, b) {
        return -1+Math.floor(Math.random()*3);
    });
    console.log(cards);

    titleView = document.createElement("img");
    titleView.style.position = "absolute";
    titleView.style.left = ((sw/2)-50)+"px";
    titleView.style.top = ((sh/2)-(sw/2)-150)+"px";
    titleView.style.width = (100)+"px";
    titleView.style.height = (50)+"px";
    titleView.style.objectFit = "cover";
    titleView.src = "img/title-0.png";
    titleView.style.zIndex = "15";
    document.body.appendChild(titleView);

    playView = document.createElement("img");
    playView.style.position = "absolute";
    //playView.style.display = "none";
    playView.style.left = ((sw/2)-50)+"px";
    playView.style.top = ((sh/2)-(sw/2)-50)+"px";
    playView.style.width = (100)+"px";
    playView.style.height = (35)+"px";
    playView.style.objectFit = "contain";
    playView.src = "img/play.png";
    playView.style.zIndex = "15";
    document.body.appendChild(playView);

    lifeCountView = document.createElement("div");
    lifeCountView.style.position = "absolute";
    lifeCountView.style.color = "#fff";
    lifeCountView.style.textAlign = "center";
    lifeCountView.style.left = ((sw/2)-50)+"px";
    lifeCountView.style.top = ((sh/2)-(sw/2)-100)+"px";
    lifeCountView.style.width = (100)+"px";
    lifeCountView.style.height = (35)+"px";
    lifeCountView.style.zIndex = "15";
    document.body.appendChild(lifeCountView);

    drawLifeCount();

    addressView = document.createElement("span");
    addressView.style.position = "absolute";
    //addressView.style.display = "none";
    addressView.style.color = "#fff";
    addressView.innerText = "@lynaritaa";
    addressView.style.textAlign = "center";
    addressView.style.left = ((sw/2)-50)+"px";
    addressView.style.top = ((sh/2)+(sw/2)+50)+"px";
    addressView.style.width = (100)+"px";
    addressView.style.height = (35)+"px";
    addressView.style.zIndex = "15";
    document.body.appendChild(addressView);

    cardCount = [ 8, 10, 12, 14, 16, 18, 20 ];

    cardCountView = document.createElement("span");
    cardCountView.style.position = "absolute";
    cardCountView.style.color = "#fff";
    cardCountView.innerText = cardCount[difficulty]+" cards";
    cardCountView.style.textAlign = "left";
    cardCountView.style.left = (10)+"px";
    cardCountView.style.top = ((sh/2)-(sw/2)-35)+"px";
    cardCountView.style.width = (100)+"px";
    cardCountView.style.height = (25)+"px";
    cardCountView.style.zIndex = "15";
    document.body.appendChild(cardCountView);

    playView.onclick = function() {
        playView.style.display = "none";
        locked = true;
        lifeCount = 3;
        drawLifeCount();

        for (var n = 0; n < cards.length; n++) {
            cards[n].flipped = true;
            cards[n].frontSideElem.style.display = cards[n].flipped ? "none" :
            "initial";
        }

        cards = [];
        for (var n = 0; n < cardCount[difficulty]; n++) {
            var obj = {
                n: Math.floor(n/2),
                flipped: true
            };
            cards.push(obj);
        }

        cards.sort(function(a, b) {
            return -1+Math.floor(Math.random()*3);
        });
        createCards();
        cardCountView.innerText = cardCount[difficulty]+" cards";

        setTimeout(function() {
            for (var n = 0; n < cards.length; n++) {
                cards[n].flipped = false;
                cards[n].frontSideElem.style.display = 
                cards[n].flipped ? "none" : "initial";
            }

            setTimeout(function() {
                for (var n = 0; n < cards.length; n++) {
                    cards[n].flipped = true;
                    cards[n].frontSideElem.style.display = 
                    cards[n].flipped ? "none" :
                    "initial";
                }
                locked = false;
            }, 5000);
        }, 1000);
    };

    lockedIndicatorView = document.createElement("span");
    lockedIndicatorView.style.position = "absolute";
    lockedIndicatorView.innerText = "locked: "+locked;
    lockedIndicatorView.style.left = (10)+"px";
    lockedIndicatorView.style.top = ((sh/2)-(sw/2)-25)+"px";
    lockedIndicatorView.style.width = (100)+"px";
    lockedIndicatorView.style.height = (25)+"px";
    lockedIndicatorView.style.zIndex = "15";
    //document.body.appendChild(lockedIndicatorView);

    startFlipIndicatorView = document.createElement("span");
    startFlipIndicatorView.style.position = "absolute";
    startFlipIndicatorView.style.display = startFlip != -1 ? 
    "initial" : "none";
    startFlipIndicatorView.innerText = "start flip: "+startFlip;
    startFlipIndicatorView.style.left = (110)+"px";
    startFlipIndicatorView.style.top = ((sh/2)-(sw/2)-25)+"px";
    startFlipIndicatorView.style.width = (100)+"px";
    startFlipIndicatorView.style.height = (25)+"px";
    startFlipIndicatorView.style.zIndex = "15";
    //document.body.appendChild(startFlipIndicatorView);

    cardsContainerView = document.createElement("div");
    cardsContainerView.style.position = "absolute";
    cardsContainerView.style.left = (0)+"px";
    cardsContainerView.style.top = ((sh/2)-(sw/2))+"px";
    cardsContainerView.style.width = (sw)+"px";
    cardsContainerView.style.height = ((sw/5)*4)+"px";
    cardsContainerView.style.boxShadow = 
    "inset 0px 0px 5px #000";
    cardsContainerView.style.zIndex = "15";
    document.body.appendChild(cardsContainerView);

    var size = ((sw-60)/5);

    createCards();
});

var drawLifeCount = function() {
    var html = "";
    for (var n = 0; n < 3; n++) {
        if (lifeCount >= (n+1))
        html += "<i class=\"fa-solid fa-heart\"></i>";
    }
    lifeCountView.innerHTML = html;
};

var createCards = function() {
    cardsContainerView.innerHTML = "";

    for (var n = 0; n < cards.length; n++) {
        var x = (n%5);
        var y = Math.floor(n/5);

        var cardContainerView = document.createElement("div");
        cardContainerView.style.position = "absolute";
        cardContainerView.style.left = (x*(sw/5))+"px";
        cardContainerView.style.top = (y*(sw/5))+"px";
        cardContainerView.style.width = (sw/5)+"px";
        cardContainerView.style.height = (sw/5)+"px";
        cardContainerView.style.zIndex = "15";
        cardContainerView.style.transform = "scale(0.9)";
        cardsContainerView.appendChild(cardContainerView);

        var cardView = document.createElement("div");
        cardView.style.position = "absolute";
        cardView.n = n;
        cardView.style.left = (0)+"px";
        cardView.style.top = (0)+"px";
        cardView.style.width = (sw/5)+"px";
        cardView.style.height = (sw/5)+"px";
        cardView.style.border = "1px solid #fff";
        cardView.style.borderRadius = "5px";
        cardView.style.overflow = "hidden";
        cardView.style.transformStyle = "preserve-3d";
        cardView.style.zIndex = "15";
        cardContainerView.appendChild(cardView);

        var cardBackSideView = document.createElement("img");
        cardBackSideView.style.position = "absolute";
        cardBackSideView.style.left = (0)+"px";
        cardBackSideView.style.top = (0)+"px";
        cardBackSideView.style.width = (sw/5)+"px";
        cardBackSideView.style.height = (sw/5)+"px";
        cardBackSideView.src = 
        "img/card-backside-0.png";
        cardBackSideView.style.backfaceVisibility = "hidden";
        //cardBackSideView.style.transform = "rotateY(180deg)";
        cardBackSideView.style.zIndex = "15";
        cardView.appendChild(cardBackSideView);

        var cardFrontSideView = document.createElement("img");
        cardFrontSideView.style.position = "absolute";
        cardFrontSideView.style.userSelect = "none";
        cardFrontSideView.style.display = "none";
        cardFrontSideView.style.background = "#fff";
        cardFrontSideView.style.left = (0)+"px";
        cardFrontSideView.style.top = (0)+"px";
        cardFrontSideView.style.fontSize = ((sw/5)/2)+"px";
        cardFrontSideView.innerText = cards[n].n;
        cardFrontSideView.style.lineHeight = (sw/5)+"px";
        cardFrontSideView.style.textAlign = "center";
        cardFrontSideView.style.width = (sw/5)+"px";
        cardFrontSideView.style.height = (sw/5)+"px";
        cardFrontSideView.style.objectFit = "cover";
        cardFrontSideView.src = 
        "img/card-frontside-"+cards[n].n+".png";
        cardFrontSideView.style.backfaceVisibility = "hidden";
        cardFrontSideView.style.zIndex = "15";
        cardView.appendChild(cardFrontSideView);

        cardView.onclick = function() {
            flipCard(this.n);
        };

        cards[n].containerElem = cardContainerView;
        cards[n].elem = cardView;
        cards[n].frontSideElem = cardFrontSideView;
    }
};

var difficulty = 0;

var lifeCount = 3;
var locked = true;
var startFlip = -1;
var flipCard = function(n) {
    if (locked || !cards[n].flipped) return;
    if (startFlip != -1) {

        locked = true;
        cards[n].flipped = false;
        cards[n].frontSideElem.style.display = cards[n].flipped ? "none" : 
        "initial";

        if (cards[n].n != cards[startFlip].n) {
            lifeCount -= 1;
            drawLifeCount();

            setTimeout(function() {
                this.flipped = true;
                cards[startFlip].flipped = true;
                this.frontSideElem.style.display = "none";
                cards[startFlip].frontSideElem.style.display = "none";

                startFlip = -1;
                if (lifeCount > 0) locked = false;

                lockedIndicatorView.innerText = "locked: "+locked;

                startFlipIndicatorView.style.display = startFlip != -1 ? 
                "initial" : "none";
                startFlipIndicatorView.innerText = "start flip: "+startFlip;
            }.bind(cards[n]), 1000);
        }
        else {
            cards[n].elem.className = "";
            sfxPool.play("audio/correct-choice-sfx.wav");

            for (var k = 0; k < cards.length; k++)
            cards[k].containerElem.style.zIndex = "15";

            cards[n].containerElem.style.zIndex = "25";
 
            cards[n].elem.className = 
            "animate__animated animate__flip";

            animate(n, startFlip);

            startFlip = -1;
            locked = false;

            startFlipIndicatorView.style.display = startFlip != -1 ? 
            "initial" : "none";
            startFlipIndicatorView.innerText = "start flip: "+startFlip;
        }
    }
    else {
        startFlip = n;
        cards[n].flipped = false;
        cards[n].frontSideElem.style.display = cards[n].flipped ? "none" : 
        "initial";
    }

    lockedIndicatorView.innerText = "locked: "+locked;

    startFlipIndicatorView.style.display = startFlip != -1 ? 
    "initial" : "none";
    startFlipIndicatorView.innerText = "start flip: "+startFlip;

    if (lifeCount == 0 && !checkCards()) {
        playView.src = "img/play-again.png";
        playView.style.display = "initial";
    }
    else if (checkCards()) {
        playView.src = "img/play-again.png";
        playView.style.display = "initial";

        difficulty += 1;
        addressView.style.display = "initial";
    }
};

var animate = function(a, b) {
    cards[a].elem.style.outline = "5px solid #77f";
    cards[b].elem.style.outline = "5px solid #77f";

    setTimeout(function() {
        cards[a].elem.style.outline = "initial";
        cards[b].elem.style.outline = "initial";
    }, 1000);
};

var checkCards = function() {
    var flipCount = 0;
    for (var n = 0; n < cards.length; n++) {
        if (!cards[n].flipped)
        flipCount += 1;
    }

    return (cards.length == flipCount);
};

var visibilityChange;
if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support
  visibilityChange = "visibilitychange";
} else if (typeof document.msHidden !== "undefined") {
  visibilityChange = "msvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") {
  visibilityChange = "webkitvisibilitychange";
}
//^different browsers^

var backgroundMode = false;
document.addEventListener(visibilityChange, function(){
    var currentTime = new Date().getTime();
    backgroundMode = !backgroundMode;
    if (backgroundMode) {
        console.log("backgroundMode: "+backgroundMode+" - "+
        moment(currentTime).format("HH:mm SSS"));
    }
    else {
        console.log("backgroundMode: "+backgroundMode+" - "+
        moment(currentTime).format("HH:mm SSS"));
    }
}, false);
var getCenter = function(url, callback) {
    var img = document.createElement("img");
    img.onload = function() {
        var size = {
            width: this.naturalWidth,
            height: this.naturalHeight
        };
        var centerCanvas = document.createElement("canvas");
        centerCanvas.width = size.width;
        centerCanvas.height = size.height;

        var centerCtx = centerCanvas.getContext("2d");
        centerCtx.drawImage(img, 0, 0, size.width, size.height);

        var imageData = 
        centerCtx.getImageData(0, 0, size.width, size.height);
        var imageArray = imageData.data;

        var minX = size.width;
        var maxX = 0;
        var minY = size.height;
        var maxY = 0;

        var newArray = new Uint8ClampedArray(imageArray);
        for (var n = 0; n < imageArray.length; n += 4) {
            var x = (n/4)%size.width;
            var y = Math.floor((n/4)/size.width);

            var a = imageArray[n+3];

            if (a != 0 && x < minX) minX = x;
            if (a != 0 && x > maxX) maxX = x;
            if (a != 0 && y < minY) minY = y;
            if (a != 0 && y > maxY) maxY = y;
        }

        var width = (maxX-minX);
        var height = (maxY-minY);

        centerCtx.strokeStyle = "limegreen";
        //centerCtx.strokeRect(minX, minY, width, height);

        console.log(minX, minY, width, height);

        var canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(centerCanvas, 
        minX, minY, width, height,
        0, 0, width, height);

        var dataURL = canvas.toDataURL();
        var hiddenElement = document.createElement('a');
        hiddenElement.href = dataURL;
        hiddenElement.target = "_blank";
        hiddenElement.download = "centered.png";
        hiddenElement.click();
    };
    img.src = url;
};

var drawCard = function(n, text, color, url) {
    var img = document.createElement("img");
    img.onload = function() {

        var width = 50;

        var size = {
            width: this.naturalWidth,
            height: this.naturalHeight
        };
        var r = (width/size.width);
        var height = (size.height*r);

        var canvas = document.createElement("canvas");
        canvas.width = 100;
        canvas.height = 100;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 
        50-(width/2), 50-(height/2), 
        width, height);

        ctx.fillStyle = color;
        ctx.font = (25)+"px sans";
        ctx.fontWeight = 900;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.fillText(text, 12.5, 15);

        var dataURL = canvas.toDataURL();
        var hiddenElement = document.createElement('a');
        hiddenElement.href = dataURL;
        hiddenElement.target = "_blank";
        hiddenElement.download = "card-frontside-"+n+".png";
        hiddenElement.click();
    };
    img.src = url;
};

/*
getCenter("img/suit/tile000.png");
getCenter("img/suit/tile001.png");
getCenter("img/suit/tile002.png");
getCenter("img/suit/tile003.png");
*/

/*
drawCard(0, "A", "#000", "img/suit/spades-suit.png");
drawCard(1, "2", "#000", "img/suit/clubs-suit.png");
drawCard(2, "3", "#f00", "img/suit/hearts-suit.png");
drawCard(3, "4", "#f00", "img/suit/diamonds-suit.png");
drawCard(4, "5", "#000", "img/suit/spades-suit.png");
drawCard(5, "6", "#000", "img/suit/clubs-suit.png");
drawCard(6, "7", "#f00", "img/suit/hearts-suit.png");
drawCard(7, "Q", "#f00", "img/suit/diamonds-suit.png");
drawCard(8, "J", "#000", "img/suit/spades-suit.png");
drawCard(9, "K", "#000", "img/suit/clubs-suit.png");
*/
function Player(name) {
    this.name = name;
}

Player.prototype.locate = function(x, y) {
    this.x = x;
    this.y = y;
    if (this.elm) {
        this.elm.style.left = x + "px";
        this.elm.style.top = y + "px";
    }
};


const Game = {
    score: 0,
    updateScore: function() {
        this.score += 10;
        const scoreElm = document.getElementById("score-board");
        if (scoreElm) {
            scoreElm.innerText = "Score: " + this.score;
        }
    }
};

function Cat(name){
    Player.call(this, name);
    this.timer = null;
    this.create();
    this.x = 0;
    this.y = 0;
}

Cat.prototype = Object.create(Player.prototype);
Cat.prototype.constructor = Cat;

Cat.prototype.ramdomImg = function(){
    var imgs = ["feeding-bottle.png"];
    return imgs[Math.floor(Math.random() * imgs.length)];
}

var imgs = [ "feeding-bottle.png" ];


Cat.prototype.create = function () {
    var iconsContainer = document.querySelector(".icons");

    var player = document.createElement("div");
    var img = document.createElement("img");
    img.src = this.ramdomImg();
    img.setAttribute("class", "catImg");
    player.appendChild(img);
    player.setAttribute("class", "catIcon");

    player.style.cursor = "pointer";
    player.style.position = "absolute";

    this.catSrc = img;

    if(iconsContainer) {
        this.elm = iconsContainer.appendChild(player);
    } else {
        this.elm = document.body.appendChild(player);
    }

    this.refreshCat();
    player.addEventListener("click", this.refreshCat.bind(this));
};

Cat.prototype.refreshCat = function() {
    if (this.timer) {
        clearInterval(this.timer);
    }
    this.setLocation();


    this.checkFeederCollision();
};

Cat.prototype.setLocation = function(){
    this.catSrc.src = this.ramdomImg();
    var randomX = Math.floor(Math.random() * (window.innerWidth - 300));
    var randomY = Math.floor(Math.random() * (window.innerHeight - 300));
    this.locate(randomX, randomY);
}


Cat.prototype.checkFeederCollision = function() {
    var feeder = document.querySelector(".feeder");
    if (!feeder || !this.elm) return;

    var catRect = this.elm.getBoundingClientRect();
    var feederRect = feeder.getBoundingClientRect();


    var isOverlapping = !(
        catRect.right < feederRect.left ||
        catRect.left > feederRect.right ||
        catRect.bottom < feederRect.top ||
        catRect.top > feederRect.bottom
    );

    if (isOverlapping) {
        Game.updateScore();
    }
};

Cat.prototype.getLocation = function() {
    return {x: this.x , y: this.y};
}

Cat.prototype.getSize = function(){
    return {width: this.elm.offsetWidth, height: this.elm.offsetHeight};
}

Cat.prototype.destroy = function(){
    if (this.timer) {
        clearInterval(this.timer);
    }
    if (this.elm && this.elm.parentNode) {
        this.elm.parentNode.removeChild(this.elm);
    }
}

window.onload = function() {
    const myCat = new Cat("Tom");
};

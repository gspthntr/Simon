let gameStart = false;
let botTurn = true;
// let playerTurn = false;
let playerSequence = [];
let botSequence = [];
const soundMap = {
    green: new Audio("./sounds/green.mp3"),
    blue: new Audio("./sounds/blue.mp3"),
    red: new Audio("./sounds/red.mp3"),
    yellow: new Audio("./sounds/yellow.mp3"),
    wrong: new Audio("./sounds/wrong.mp3")
}

function clickBtn(colour){
    if(botTurn === false){
        soundMap[colour].play();
        $(`#${colour}`).addClass("pressed");
        setTimeout(()=>{$(`#${colour}`).removeClass("pressed")}, 100)
    }
}

//Random colour clicker
function randClick(){
    if(!botTurn) return;
    const colours = Object.keys(soundMap).filter(colour => colour !== "wrong");
    const randIndex = Math.floor(Math.random() * colours.length);
    const randColour = colours[randIndex];
    const randSound = soundMap[randColour];
    console.log(randSound);
    clickBtn(randColour);
    botSequence.push(randColour);
    console.log(botSequence);
}

//Colour checker
function sameColour(){
    // if(playerSequence.length !== botSequence.length) return;
    for(let i = 0; i < playerSequence.length; i++){
        if(playerSequence[i] !== botSequence[i]){
            soundMap.wrong.play();
            console.log("WRONG ORDER");
            return false
        }
    }
    console.log("CORRECT ORDER");
    return playerSequence.length === botSequence.length;
}


function botFunc(){
    if(botTurn){
        randClick();
        botTurn = false;
        setTimeout(() => {}, 1000)
    }
}

function game(){
    botFunc();
    $(".btn").on("click", function(){
        if(botTurn) return;

        const colour = $(this).attr("id")
        clickBtn(colour);
        playerSequence.push(colour);
        console.log(playerSequence);

        if(!sameColour()){
            console.log("GAME OVER!")
            gameReset();
        }
        if(playerSequence.length === botSequence.length){
            botTurn = true;
            playerSequence = [];
            setTimeout(botFunc, 1000);
        }
    });
}

function gameReset(){
    $("#level-title").text("Press A Key to Start");
    gameStart = false;
    botTurn = true;
    playerSequence = [];
    botSequence = [];
}
$(document).on("keydown", function(){
    if (!gameStart) {
        console.log("GAME STARTING");
        $("#level-title").text("GAME STARTED");
        gameStart = true;
        game();
    }
});

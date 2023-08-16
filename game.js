
var buttonColours =["red","blue","green","yellow"];
var randomChosenColour;
var gamePattern =[];
var userClickedPattern=[];
var level=0;
$(".btn").click(function (){
    
    var userChosenColour= $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

var started=false;
$(document).keypress(function (event){
     if(!started&& event.key==='a'){
        $("#level-title").text("Level "+level);
        nextSequence();
        started=true;
     }
});
function playSound(name){
    var audio= new Audio(name+".mp3");
    audio.play();

}
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function () {
        $("#"+currentColour).removeClass("pressed");
    },100);
}
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        if(gamePattern.length===userClickedPattern.length){
            setTimeout(function () {
                nextSequence();
            },1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press A Key to Restart");
        setTimeout(function () {
            $("body").removeClass("game-over");
        },200);
         startOver();
    }
    
}
function startOver(){
    level = 0;
  gamePattern = [];
  started = false;
}
function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);
    var n= Math.random();
    n=n*4;
    n=Math.floor(n);
    randomChosenColour = buttonColours[n];;
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    }
   